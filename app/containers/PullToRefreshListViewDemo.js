import React, {
    Component,
} from 'react'
import {
    View,
    Text,
    StyleSheet,
    Alert,
    ScrollView,
    ListView,
    Image,
    ActivityIndicator,
    ProgressBarAndroid,
    ActivityIndicatorIOS,
    Platform,
    Animated,
    Easing,
    LayoutAnimation
} from 'react-native'

import PullToRefreshListView from 'react-native-smart-pull-to-refresh-listview'
export default class PullToRefreshListViewDemo extends Component {
  constructor(props) {
    super(props);

    this._dataSource = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
        //sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
    });
    let dataList = []
    this.state = {
      first: true,
      dataList: dataList,
      dataSource: this._dataSource.cloneWithRows(dataList),
      rotation: new Animated.Value(0),
      rotationNomal: new Animated.Value(0),
      addNum: 20
    }
  }

    componentDidMount () {
      this.initAnimated()
      this._pullToRefreshListView.beginRefresh()
    }
    componentWillUpdate() {
      // 以后这样写
      // this.setState((state) => ({views: [...state.views, {}]}));
      // LayoutAnimation.easeInEaseOut();
      // LayoutAnimation.configureNext(customerAnimation);
    }
    initAnimated() {
      this._an = Animated.timing(this.state.rotation, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
      }).start((r) => {
        this.state.rotation.setValue(0)
        this.initAnimated()
      })
    }
    //Using ListView
    render() {
        return (
            <PullToRefreshListView
                ref={ (component) => this._pullToRefreshListView = component }
                viewType={PullToRefreshListView.constants.viewType.listView}
                contentContainerStyle={{backgroundColor: 'yellow', }}
                style={{marginTop: Platform.OS == 'ios' ? 64 : 56, }}
                initialListSize={20}
                enableEmptySections={true}
                dataSource={this.state.dataSource}
                pageSize={20}
                renderRow={this._renderRow}
                renderHeader={this._renderHeader}
                renderFooter={this._renderFooter}
                //renderSeparator={(sectionID, rowID) => <View style={styles.separator} />}
                onRefresh={this._onRefresh}
                onLoadMore={this._onLoadMore}
                pullUpDistance={60}
                pullUpStayDistance={50}
                pullDownDistance={60}
                pullDownStayDistance={50}
            />
        )

    }

    _renderRow = (rowData, sectionID, rowID) => {
        return (
            <View style={styles.thumbnail}>
                <View style={styles.textContainer}>
                    <Text>{rowData.text}</Text>
                </View>
            </View>
        )
    }

    _renderHeader = (viewState) => {
        let {pullState, pullDistancePercent} = viewState
        let {refresh_none, refresh_idle, will_refresh, refreshing,} = PullToRefreshListView.constants.viewState
        pullDistancePercent = Math.round(pullDistancePercent * 100)
        switch(pullState) {
            case refresh_none:
                return (
                    <Animated.View style={{top: -15,height: 60, justifyContent: 'center', alignItems: 'center', backgroundColor: 'pink',}}>
                        <Text>pull down to refresh</Text>
                    </Animated.View>
                )
            case refresh_idle:
              this.state.rotationNomal.setValue(pullDistancePercent)
                return (
                    <Animated.View style={{ flexDirection: 'row',height: 60, justifyContent: 'center', alignItems: 'center', backgroundColor: 'pink',}}>
                      <Image
                        style={{width: 15, height: 15,

                        }}
                        source={require('./img/refresh.png')}
                      />
                      <Text>pull down to refresh{pullDistancePercent}%</Text>
                    </Animated.View>
                )
            case will_refresh:
                return (
                    <Animated.View style={{flexDirection: 'row', height: 60, justifyContent: 'center', alignItems: 'center', backgroundColor: 'pink',}}>
                      <Animated.Image
                        style={{width: 15, height: 15,
                          transform: [{
                            rotateZ: this.state.rotation.interpolate({
                              inputRange: [0,1],
                              outputRange: ['0deg', '360deg']
                            })
                          }]
                        }}
                        source={require('./img/refresh.png')}
                      />
                      <Text>release to refresh{pullDistancePercent > 100 ? 100 : pullDistancePercent}%</Text>
                    </Animated.View>
                )
            case refreshing:
                return (
                    <Animated.View style={{top: 10,flexDirection: 'row', height: 60, justifyContent: 'center', alignItems: 'center', backgroundColor: 'pink',}}>
                        <Animated.Image
                          style={{width: 15, height: 15,
                            transform: [{
                              rotateZ: this.state.rotation.interpolate({
                                inputRange: [0,1],
                                outputRange: ['0deg', '360deg']
                              })
                            }]
                          }}
                          source={require('./img/refresh.png')}
                        />
                      <Text>refreshing</Text>
                    </Animated.View>
                )
        }
    }

    _renderFooter = (viewState) => {
        let {pullState, pullDistancePercent} = viewState
        let {load_more_none, load_more_idle, will_load_more, loading_more, loaded_all, } = PullToRefreshListView.constants.viewState
        pullDistancePercent = Math.round(pullDistancePercent * 100)
        switch(pullState) {
            case load_more_none:
                return (
                    <View style={{height: 35, justifyContent: 'center', alignItems: 'center', backgroundColor: 'pink',}}>
                        <Text>pull up to load more</Text>
                    </View>
                )
            case load_more_idle:
                return (
                    <View style={{height: 35, justifyContent: 'center', alignItems: 'center', backgroundColor: 'pink',}}>

                      <Text>pull up to load more{pullDistancePercent}%</Text>
                    </View>
                )
            case will_load_more:
                return (
                    <View style={{height: 35, justifyContent: 'center', alignItems: 'center', backgroundColor: 'pink',}}>
                        <Text>release to load more{pullDistancePercent > 100 ? 100 : pullDistancePercent}%</Text>
                    </View>
                )
            case loading_more:
                return (
                    <View style={{flexDirection: 'row', height: 35, justifyContent: 'center', alignItems: 'center', backgroundColor: 'pink',}}>
                        {this._renderActivityIndicator()}<Text>loading</Text>
                    </View>
                )
            case loaded_all:
                return (
                    <View style={{height: 35, justifyContent: 'center', alignItems: 'center', backgroundColor: 'pink',}}>
                        <Text>no more</Text>
                    </View>
                )
        }
    }

    _onRefresh = () => {
        setTimeout( () => {

            //console.log('outside _onRefresh end...')
            let addNum = this.state.addNum
            let refreshedDataList = []
            for(let i = 0; i < addNum; i++) {
                refreshedDataList.push({
                    text: `item-${i}`
                })
            }

            this.setState({
                dataList: refreshedDataList,
                dataSource: this._dataSource.cloneWithRows(refreshedDataList),
            })
            this._pullToRefreshListView.endRefresh()
            this.setState({addNum: 3})
        }, 2000)
    }

    _onLoadMore = () => {
        //console.log('outside _onLoadMore start...')

        setTimeout( () => {

            //console.log('outside _onLoadMore end...')

            let length = this.state.dataList.length
            let addNum = 20
            let addedDataList = []
            if(length >= 100) {
                addNum = 3
            }
            for(let i = length; i < length + addNum; i++) {
                addedDataList.push({
                    text: `item-${i}`
                })
            }
            let newDataList = this.state.dataList.concat(addedDataList)
            this.setState({
                dataList: newDataList,
                dataSource: this._dataSource.cloneWithRows(newDataList),
            })

            let loadedAll
            if(length >= 100) {
                loadedAll = true
                this._pullToRefreshListView.endLoadMore(loadedAll)
            }
            else {
                loadedAll = false
                this._pullToRefreshListView.endLoadMore(loadedAll)
            }

        }, 2000)
    }

    _renderActivityIndicator() {
        return ActivityIndicator ? (
            <ActivityIndicator
                style={{marginRight: 10,}}
                animating={true}
                color={'#ff0000'}
                size={'small'}/>
        ) : Platform.OS == 'android' ?
            (
                <ProgressBarAndroid
                    style={{marginRight: 10,}}
                    color={'#ff0000'}
                    styleAttr={'Small'}/>

            ) :  (
            <ActivityIndicatorIOS
                style={{marginRight: 10,}}
                animating={true}
                color={'#ff0000'}
                size={'small'}/>
        )
    }

}



const styles = StyleSheet.create({
    itemHeader: {
        height: 35,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#ccc',
        backgroundColor: 'blue',
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
    },
    item: {
        height: 60,
        //borderBottomWidth: StyleSheet.hairlineWidth,
        //borderBottomColor: '#ccc',
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
    },

    contentContainer: {
        paddingTop: 20 + 44,
    },

    thumbnail: {
        padding: 6,
        flexDirection: 'row',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#ccc',
        overflow: 'hidden',
    },

    textContainer: {
        padding: 20,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})
