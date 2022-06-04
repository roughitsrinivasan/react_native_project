import React, { Component } from "react";
import { Text, SafeAreaView, View, StatusBar, StyleSheet, Image, BackHandler, ScrollView, TouchableOpacity, Button } from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes } from "../../constant/styles";
import { MaterialIcons, Ionicons, FontAwesome, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { TextInput } from 'react-native-paper';
import { BottomSheet } from 'react-native-elements';
import { TransitionPresets } from 'react-navigation-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';





class ReportScreen extends Component {
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    }

    handleBackButton = () => {
        this.props.navigation.pop();
        return true;
    };

    constructor(props) {
        super(props);
        const {params} = this.props;
        this.state = {
            tableHead: ['City', '# of Rents after Sold', '# of Sold', 'Rental Ratio'],
            tableData: [
              ['North York', '137', '1221', '4'],
              ['Scarborough', '165', '1641', '10.1'],
              ['Toronto', '161', '1975', '8.2'],
              ['Etobicoke', '79', '1019', '7.8']
            ],
            tableDataNorth: [],
            tableDataWest: [],
            tableDataCentral: [],
            tableDataEast: [],
            tableDataOther: [],
          }
          this.fetchReportsData();
    }

    async fetchReportsData(){
        fetch(`http://18.118.172.175:8372/api/get/investment/ratio/reports`)
        .then(res => res.json())
        .then(json => {
          // console.log(json);
          if (json.error_code == 0) {
            let result = json.result;
            // let tempEast = [], tempWest = [], tempNorth = [], tempCentral = [], tempOther = [];
            let tempArray, temp, data1;
            tempArray = []
            for (data1 of result["GTA-Central"]) {
                 temp = []
                 temp.push(data1.city)
                 temp.push(data1.rents_after_sold)
                 temp.push(data1.sold)
                 temp.push(data1.rental_ratio)
                 tempArray.push(temp)
            }
            console.log(tempArray);
            this.setState({tableDataCentral: tempArray})

            tempArray = []
            for (data1 of result["GTA-East"]) {
                 temp = []
                 temp.push(data1.city)
                 temp.push(data1.rents_after_sold)
                 temp.push(data1.sold)
                 temp.push(data1.rental_ratio)
                 tempArray.push(temp)
            }
            console.log(tempArray);
            this.setState({tableDataEast: tempArray})

            tempArray = []
            for (data1 of result["GTA-North"]) {
                 temp = []
                 temp.push(data1.city)
                 temp.push(data1.rents_after_sold)
                 temp.push(data1.sold)
                 temp.push(data1.rental_ratio)
                 tempArray.push(temp)
            }
            console.log(tempArray);
            this.setState({tableDataNorth: tempArray})

            tempArray = []
            for (data1 of result["GTA-West"]) {
                 temp = []
                 temp.push(data1.city)
                 temp.push(data1.rents_after_sold)
                 temp.push(data1.sold)
                 temp.push(data1.rental_ratio)
                 tempArray.push(temp)
            }
            console.log(tempArray);
            this.setState({tableDataWest: tempArray})
            tempArray = []

            for (data1 of result["GTA-Other"]) {
                 temp = []
                 temp.push(data1.city)
                 temp.push(data1.rents_after_sold)
                 temp.push(data1.sold)
                 temp.push(data1.rental_ratio)
                 tempArray.push(temp)
            }
            console.log(tempArray);
            this.setState({tableDataOther: tempArray})

          }
        });

    }


    _alertIndex(index) {
        Alert.alert(`This is row ${index + 1}`);
      }

    render() { 
        return ( 
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
                <StatusBar
                    translucent={false}
                    backgroundColor={Colors.primaryColor}
                />
                <View style={{ flex: 1 }}>
                    {this.header()}
                    {this.horizontal()}
                    {this.tablehead()}
                    <View>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingVertical: Sizes.fixPadding * 2.0 }}
                    >
                      {this.title({ title: 'GTA - Central' })}
                      {this.table()}
                      {this.title({ title: 'GTA - North' })}
                      {this.table2()}
                      {this.title({ title: 'GTA - East' })}
                      {this.table3()}
                      {this.title({ title: 'GTA - West' })}
                      {this.table4()}
                      {this.title({ title: 'GTA - Other' })}
                      {this.table5()}
                        
                    </ScrollView>
                    </View>
                </View>
            </SafeAreaView>
         );
    }

    title({ title }) {
      return (
          <Text style={{
              ...Fonts.blackColor18Bold,
              // marginHorizontal: Sizes.fixPadding * 2.0,
              // marginTop: Sizes.fixPadding,
              backgroundColor: 'whitesmoke',
              paddingTop: '2%',
              paddingBottom: '2%',
              paddingLeft: '2%'

          }}>
              {title}
          </Text>
      )
  }

    header() {
        return (
            <View style={styles.headerStyle}>
                <View style={styles.headerContentStyle}>
                    <Text style={{ ...Fonts.primaryColor18Bold }}>Housilon</Text>
                    <View style={{ flexDirection: 'column' }}>
                        
                    </View>
                </View>
                <View>
                    
                </View>
            </View>

        )
    }

    horizontal() {  
      return ( 
          <View style={{backgroundColor: '#3270fc'}}>  
          <ScrollView  horizontal={true} style={{}}>  

              <View style={[{ width: 100,height: 40, }]}>  
                  <Button  
                      onPress={this.onPressButton}  
                      title="Detached"  
                      color="#3270fc"  
                  />  
              </View>  
              <View style={[{ width: 160,height: 40,}]}>  
                  <Button  
                      onPress={this.onPressButton}  
                      title="Semi-Detached"  
                      color="#3270fc"  
                  />  
              </View>   
              <View style={[{ width: 220,height: 40, }]}>  
                  <Button  
                      onPress={this.onPressButton}  
                      title="Freehold Townhouse"  
                      color="#3270fc"  
                  />  
              </View>   
              <View style={[{ width: 160,height: 40, }]}>  
                  <Button  
                      onPress={this.onPressButton}  
                      title="Condo Townhouse"  
                      color="#3270fc"  
                  />  
              </View>  
              <View style={[{ width: 120,height: 40, }]}>  
                  <Button  
                      onPress={this.onPressButton}  
                      title="Condo Apt"  
                      color="#3270fc"  
                  />  
              </View>  
              <View style={[{ width: 80,height: 40, }]}>  
                  <Button  
                      onPress={this.onPressButton}  
                      title="Link"  
                      color="#3270fc"

                  />  
              </View> 
               
          </ScrollView>  
          </View> 
      );  
  }

  tablehead() {
    return (
      <Row data={this.state.tableHead} style={styles.head} textStyle={{ ...Fonts.whiteColor14SemiBold,textAlign: 'center' }}/>
    )
  }

    table () {
        const state = this.state;
    const element = (data, index) => (
      <TouchableOpacity onPress={() => this._alertIndex(index)}>
        <View style={styles.btn}>
          <Text style={styles.btnText}>button</Text>
        </View>
      </TouchableOpacity>
    );
        return (
            <View >
            <Table borderStyle={{borderColor: 'transparent'}}>
              
              {
                state.tableDataCentral.map((rowData, index) => (
                  <TableWrapper key={index} style={styles.row}>
                    {
                      rowData.map((cellData, cellIndex) => (
                        <Cell key={cellIndex} data={cellIndex === 4 ? element(cellData, index) : cellData} textStyle={styles.text}/>
                      ))
                    }
                  </TableWrapper>
                ))
              }
            </Table>
          </View>
        )
    }

    table2 () {
      const state = this.state;
  const element = (data, index) => (
    <TouchableOpacity onPress={() => this._alertIndex(index)}>
      <View style={styles.btn}>
        <Text style={styles.btnText}>button</Text>
      </View>
    </TouchableOpacity>
  );
      return (
          <View >
          <Table borderStyle={{borderColor: 'transparent'}}>

            {
              state.tableDataNorth.map((rowData, index) => (
                <TableWrapper key={index} style={styles.row}>
                  {
                    rowData.map((cellData, cellIndex) => (
                      <Cell key={cellIndex} data={cellIndex === 4 ? element(cellData, index) : cellData} textStyle={styles.text}/>
                    ))
                  }
                </TableWrapper>
              ))
            }
          </Table>
        </View>
      )
  }

  table3 () {
    const state = this.state;
const element = (data, index) => (
  <TouchableOpacity onPress={() => this._alertIndex(index)}>
    <View style={styles.btn}>
      <Text style={styles.btnText}>button</Text>
    </View>
  </TouchableOpacity>
);
    return (
        <View >
        <Table borderStyle={{borderColor: 'transparent'}}>
          {
            state.tableDataEast.map((rowData, index) => (
              <TableWrapper key={index} style={styles.row}>
                {
                  rowData.map((cellData, cellIndex) => (
                    <Cell key={cellIndex} data={cellIndex === 4 ? element(cellData, index) : cellData} textStyle={styles.text}/>
                  ))
                }
              </TableWrapper>
            ))
          }
        </Table>
      </View>
    )
}

table4 () {
  const state = this.state;
const element = (data, index) => (
<TouchableOpacity onPress={() => this._alertIndex(index)}>
  <View style={styles.btn}>
    <Text style={styles.btnText}>button</Text>
  </View>
</TouchableOpacity>
);
  return (
      <View >
      <Table borderStyle={{borderColor: 'transparent'}}>
        {
          state.tableDataWest.map((rowData, index) => (
            <TableWrapper key={index} style={styles.row}>
              {
                rowData.map((cellData, cellIndex) => (
                  <Cell key={cellIndex} data={cellIndex === 4 ? element(cellData, index) : cellData} textStyle={styles.text}/>
                ))
              }
            </TableWrapper>
          ))
        }
      </Table>
    </View>
  )
}

table5 () {
  const state = this.state;
const element = (data, index) => (
<TouchableOpacity onPress={() => this._alertIndex(index)}>
  <View style={styles.btn}>
    <Text style={styles.btnText}>button</Text>
  </View>
</TouchableOpacity>
);
  return (
      <View >
      <Table borderStyle={{borderColor: 'transparent'}}>
        {
          state.tableDataOther.map((rowData, index) => (
            <TableWrapper key={index} style={styles.row}>
              {
                rowData.map((cellData, cellIndex) => (
                  <Cell key={cellIndex} data={cellIndex === 4 ? element(cellData, index) : cellData} textStyle={styles.text}/>
                ))
              }
            </TableWrapper>
          ))
        }
      </Table>
      <Text>
        {"\n\n\n\n\n\n\n\n\n"}
      </Text>
    </View>
  )
}

}

const styles = StyleSheet.create({
    headerStyle: {
        height: 60.0,
        elevation: 5.0,
        backgroundColor: Colors.whiteColor,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerContentStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    container: {
        flex: 1,
        padding: 20,
    },
    continueButtonStyle: {
        borderRadius: Sizes.fixPadding * 0.7,
        alignItems: 'center',
        justifyContent: 'center',
        height: 40.0,
        
    },
    // container1: { flex: 1, padding: 12, paddingTop: 15, backgroundColor: '#fff' },
    head: { height: 60, backgroundColor: '#3270fc' },
    text: { margin: 10 },
    row: { flexDirection: 'row', backgroundColor: 'white' },
    btn: { width: 58, height: 18, backgroundColor: '#78B7BB',  borderRadius: 2 },
    btnText: { textAlign: 'center', color: '#fff' }
    
})

ReportScreen.navigationOptions = () => {
    return {
        header: () => null,
        ...TransitionPresets.SlideFromRightIOS,
    }
}

export default withNavigation(ReportScreen); 
