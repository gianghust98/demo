export default class GraphSetting {
    //行数・列数
    ROW_COUNT = 6
    COLUMN_COUNT = 5

    //カラムで使用する値
    COLUMN_DATA = []

    //データ表示位置
    MARGIN_DATA_LEFT = 0.0
    MARGIN_DATA_RIGHT = 0.0
    MARGIN_DATA_TOP = 0.0
    MARGIN_DATA_BOTTOM = 0.0

    //データの配列
    LEFT_DATA = []
    LEFT_DATA_RANGE_HEIGHT = []
    LEFT_DATA_RANGE_LOW = []
    mScale = []

    //開始地点・終了地点
    mDataMinX = 0.0
    mDataMaxX = 0.0

    //行テキストフォーマット
    mLowTextFormat = ""
    //行テキストフォーマット
    mUnitText = ""
    //列テキストの表示方法( 0:日付 1:年齢)
    static COLUMN_TEXT_DATE = 0
    static COLUMN_TEXT_AGE = 1
    static COLUMN_TEXT_AGE_MONTH = 2

    mColumnText = GraphSetting.COLUMN_TEXT_DATE
    mColumnAgeBirthday
    mEmptyText


    //グラフ色
    COLOR_RANGE = "#0000FF"
    COLOR_DATA_LINE = "#D3D3D3"

    //3ヶ月ごとのグラフ切替
    static MONTH_PERIOD = 3
    //7日ごとのグラフ切替
    static DAY_TEMP_PERIOD = 7

    constructor(){
        //マージンの設定
        this.MARGIN_DATA_LEFT = 32
        this.MARGIN_DATA_RIGHT = 20
        this.MARGIN_DATA_BOTTOM = 20
        this.MARGIN_DATA_TOP = 6
    }

    setData(data){
        this.LEFT_DATA = data
    }

    setDataRangeHeight(data){
        this.LEFT_DATA_RANGE_HEIGHT = data
    }

    setDataRangeLow(data){
        this.LEFT_DATA_RANGE_LOW = data
    }

    calcScale(rangeScale){
        this._calcScale(parseFloat(Number.MIN_SAFE_INTEGER), parseFloat(Number.MAX_SAFE_INTEGER), rangeScale)
    }

    _calcScale(defaultMaxScale, defaultMinScale, rangeScale){
            
        maxNum = this.getMaxDataY();
        if (maxNum < defaultMaxScale) {
            maxNum = defaultMaxScale
        }

        minNum = this.getMinDataY();
        if (minNum > defaultMinScale) {
            minNum = defaultMinScale
        }

        //データの一番大きな値
        let maxScale = Math.floor(Math.ceil(maxNum / rangeScale)) * rangeScale

        //データの一番小さな値
        let minScale = Math.floor(minNum / rangeScale) * rangeScale

        var range = (maxScale - minScale) / parseFloat(this.ROW_COUNT)

        if (range > rangeScale)  {
            range = Math.floor(Math.ceil(range / rangeScale)) * rangeScale;
        } else {
            range = rangeScale;
        }

        for ( var i =0; i < this.ROW_COUNT+1; i++ ) {
            this.mScale.unshift(minScale + parseFloat(i) * range)
        }
    }

    setDataMinX(minX){
        this.mDataMinX = minX;
    }

    setDataMaxX(maxX){
        this.mDataMaxX = maxX;
    }

    setDataMinX(){
        min = parseFloat(Number.MAX_SAFE_INTEGER)
        for (var object of this.LEFT_DATA) {
            if (min > object.dataX) {
                min = object.dataX
            }
        }
        for (var object of this.LEFT_DATA_RANGE_LOW) {
            if (min > object.dataX) {
                min = object.dataX
            }
        }
        for (var object of this.LEFT_DATA_RANGE_HEIGHT) {
            if (min > object.dataX) {
                min = object.dataX
            }
        }
        this.mDataMinX = min
    }

    setDataMaxX(){
        max = parseFloat(Number.MIN_SAFE_INTEGER)
        for (var object of this.LEFT_DATA) {
            if (max < object.dataX) {
                max = object.dataX
            }
        }
        for (var object of this.LEFT_DATA_RANGE_LOW) {
            if (max < object.dataX) {
                max = object.dataX
            }
        }
        for (var object of this.LEFT_DATA_RANGE_HEIGHT) {
            if (max < object.dataX) {
                max = object.dataX
            }
        }
        this. mDataMaxX = max;
    }

    getMinDataY(){
        min = parseFloat(Number.MAX_SAFE_INTEGER)
        for (var object of this.LEFT_DATA) {
            if (min > object.dataY) {
                min = object.dataY
            }
        }
        for (var object of this.LEFT_DATA_RANGE_LOW) {
            if (min > object.dataY) {
                min = object.dataY
            }
        }
        for (var object of this.LEFT_DATA_RANGE_HEIGHT) {
            if (min > object.dataY) {
                min = object.dataY
            }
        }
        return min;
    }

    getMaxDataY(){
        max = parseFloat(Number.MIN_SAFE_INTEGER)
        for (var object of this.LEFT_DATA) {
            if (max < object.dataY) {
                max = object.dataY
            }
        }
        for (var object of this.LEFT_DATA_RANGE_LOW) {
            if (max < object.dataY) {
                max = object.dataY
            }
        }
        for (var object of this.LEFT_DATA_RANGE_HEIGHT) {
            if (max < object.dataY) {
                max = object.dataY
            }
        }
        return max;
    }
        
}