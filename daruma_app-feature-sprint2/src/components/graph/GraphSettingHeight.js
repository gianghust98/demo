import GraphSetting from './GraphSetting'
import GraphDataObject from './GraphDataObject'
import ChildGraphComponent from './ChildGraphComponent'
import PeriodCalculation from '../../utils/PeriodCalculation'

export default class GraphSettingHeight {
    
        static create(child, startDate, endDate, data){
        
            let setting = new GraphSetting()
            
            //上限レンジの設定
            setting.setDataRangeHeight(ChildGraphComponent.getGraphData(child, startDate, endDate, 0, 0))
            //下限の設定
            setting.setDataRangeLow(ChildGraphComponent.getGraphData(child, startDate, endDate, 0, 1))
            //データの設定
            let objects = this.createGraphObject(data)
            setting.setData(ChildGraphComponent.adjustGraphObject(startDate, endDate, objects))
            setting.setDataMinX(startDate.getTime())
            setting.setDataMaxX(endDate.getTime())
            //縦目盛の設定
            setting.calcScale(0.5)
            //単位テキスト設定
            setting.mUnitText = "cm"
            setting.mLowTextFormat = "0.0"
            //色の設定
            setting.COLOR_RANGE  = '#FFF8F9'
            setting.COLOR_DATA_LINE  = "#FF8090"
            
            setting.mColumnText = GraphSetting.COLUMN_TEXT_AGE_MONTH
            setting.mColumnAgeBirthday = ChildGraphComponent.formatCalendar(child.birthday)
            
            setting.mEmptyText = "直近の身長記録がありません"
            
            setting.COLUMN_DATA = [];
            let diffMonth = PeriodCalculation.dateDiffMonth(startDate, endDate)

            for ( var i =0; i < diffMonth; i++ ) {
                let tmp = new Date(startDate)
                tmp.setMonth(startDate.getMonth()+ i)
                // let tmp = (calendar as NSCalendar).date(byAdding: .month, value: i, to: startDate, options: [])!
                setting.COLUMN_DATA.push(tmp.getTime())
            }
            setting.COLUMN_DATA.push(endDate.getTime())
            
            //グラフ表示
            return setting
        }
        
        static  createGraphObject( data ) {
            var objects = []
            for (dto of data) {
                let object = new GraphDataObject();
                object.dataX = dto.register_date
                object.dataY = dto.record_height.height
                objects.push(object)
            }
            return objects
        }
    }