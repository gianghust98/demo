import GraphDataObject from './GraphDataObject'
import GraphSetting from './GraphSetting'
import GraphEntity from '../../model/graphEntity'
import PeriodCalculation from '../../utils/PeriodCalculation'
import moment from 'moment'

export default class ChildGraphComponent {
    
    
    static getGraphData(child, startDate, endDate, type , range ){
    
        //誕生日の取得
        let birthday = this.formatCalendar(child.birthday);
        //開始月数を取得
        let diffMonth = PeriodCalculation.dateDiffMonth(birthday, startDate)
        //終了月数を取得
        let period = PeriodCalculation.dateDiffMonth(startDate, endDate)

        //グラフデータの取得
        var data =  GraphEntity.get( diffMonth, diffMonth + period, type, child.gender,  range )
        let previous =  GraphEntity.previous( diffMonth, type, child.gender, range )
        let next =  GraphEntity.next( diffMonth + period, type, child.gender, range )

        if ( previous ) {
            data.splice(0,0, previous)
        }
        if ( next ) {
            data.splice(data.length, next)
        }

        //グラフデータオブジェクトの作成
        var list = this.combine(birthday, data );
        list = this.adjustGraphObject(startDate, endDate, list);

        return list;
    }
    
    static combine( date, entities){
        // let calendar = Calendar.current
        var objects = []
        for (entity of entities) {
            let object = new GraphDataObject()
            let cal = new Date(date)
            cal.setMonth(date.getMonth()+ entity.months)
            // let cal:Date = (calendar as NSCalendar).date(byAdding: .month, value: entity.months, to: date, options: [])!
            object.dataX = cal.getTime()
            object.dataY = entity.value
            objects.push(object)
        }

        return objects;
    }
    
    
    static getStartDate( date ) {
    
        //データの取得開始日時を取得
        // let calendar = Calendar.current
        
        let currentCal = new Date();
        let birthdayCal = this.formatCalendar(date);
        var startCal  = this.formatCalendar(date);

        var monthDiff = PeriodCalculation.dateDiffMonth(startCal, currentCal);

        //3ヶ月毎
        monthDiff = monthDiff - ( monthDiff % GraphSetting.MONTH_PERIOD);
        startCal = new Date(startCal)
        startCal.setMonth(startCal.getMonth()+ monthDiff)
        // startCal = (calendar as NSCalendar).date(byAdding: .month, value: monthDiff, to: startCal, options: [])!

        //データの取得開始が誕生日より過去になる場合は誕生日が開始地点
        if ( birthdayCal.getTime()  > startCal.getTime() ) {
            return birthdayCal;
        }
        return startCal;
    }
    
    static formatCalendar( date ) {
        var nsdate = moment(date, 'YYYY-MM-DD').toDate();
        if (!nsdate) {
            nsdate = new Date()
        }
        return nsdate

        // let date_formatter: DateFormatter = DateFormatter()
        // date_formatter.locale = Locale(identifier: "ja_JP")
        // date_formatter.dateFormat = "YYYY-MM-dd"
        // var nsdate = date_formatter.date(from: date)
        // if nsdate == nil {
        //     nsdate = Date()
        // }
        // return nsdate!
    }
    
    // @discardableResult
    static adjustGraphObject( startDate, endDate, objects ) {
    
        let start = startDate.getTime()
        let end = endDate.getTime()
        
        //データが一つ以下の場合は何もしない
        if (objects.length < 2) {
            return objects
        }
        
        //最小値を調整
        let min = objects[0]
        if ( min.dataX < start ) {
            let cmp = objects[1]
            let value = (cmp.dataY - min.dataY) / (cmp.dataX - min.dataX)
            min.dataY = min.dataY + ((start - min.dataX) * value)
            min.dataX = start;
        }
        
        //最大値を調整
        let max = objects[objects.length-1]
        if (max.dataX > end) {
            let cmp = objects[objects.length-2]
            let value = (max.dataY - cmp.dataY) / (max.dataX - cmp.dataX)
            max.dataY = cmp.dataY + (( end - cmp.dataX) * value)
            max.dataX = end
        }
        
        return objects
    }
}
