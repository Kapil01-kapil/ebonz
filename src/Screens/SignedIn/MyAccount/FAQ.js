import React, { Component, } from 'react';
import {StyleSheet,Text, View, ScrollView} from 'react-native';
import {Header} from '../../../Components/Header'
import { connect } from 'react-redux';
class FAQ extends Component {
constructor(props) {
    super(props);

    this.state={number:null,contry:null,username:null,modalVisible: false, index: 0,}
   
}



     
  render() {

    return (
  
   <View style={styles.container}>             
          <ScrollView>

           {/* <Header  Text='Help and Support' nav={this.props.navigation} backscreen="HelpandSupport" />  */}

          <Text>FAQ's</Text>
          
            {/* <TouchableOpacity onPress={()=>this.FAQ()}  >
            <View style={styles.view4} >
            
            <View style={styles.view5}>
            <Text style={styles.text4} >Get help</Text>
            <Text>See FAQ and contact support</Text>
            </View>
            <Image source={next} style={styles.img1}/>
            </View>
            </TouchableOpacity>

            <TouchableOpacity >
            <View style={styles.view4} >
            <View style={styles.view5}>
            <Text style={styles.text4} >Rate us</Text>
            <Text>If you love our app. please rate us.</Text>
            </View>
            <Image source={next} style={styles.img1}/>
            </View>
            </TouchableOpacity>


            <TouchableOpacity >
            <View style={styles.view4} >
          
            <View style={styles.view5}>
            <Text style={styles.text4} >Invite friends to Shoopingbazar</Text>
            <Text>Invite your friends to buy and sell</Text>
            </View>
            <Image source={next} style={styles.img1}/>
            </View>
            </TouchableOpacity>


             */}
          
            </ScrollView>

            </View>

    );
  }

}

function mapStateToProps(state) {
    const { loggingIn } = state.authentication;
    console.log('Logging state from Register Screen');
    console.log(state);
    console.log('Logging state end from Register Screen');
    
    return {
        loggingIn
    };
  }
  
  const connectedFAQPage = connect(mapStateToProps)(FAQ);
  export { connectedFAQPage as FAQ };

const styles = StyleSheet.create({
  container: {
   flex:1,
    backgroundColor: 'white',    
  },
  view:{
    height:40,
    width:'100%',
    borderBottomWidth:.5,
    borderBottomColor:'black',
    justifyContent:'center',
    alignItems:'center'
  },
  view1:{
      height:120,
      width:'100%',
      flexDirection:'row',
      alignItems:'center',
      padding:30,
      justifyContent:'space-between',
      borderBottomColor:'#383838',
      borderBottomWidth:.5
    },
    view2:{
      height:100,
      width:100,
      backgroundColor:'white',
      borderRadius:50,
      justifyContent:'center',
      alignItems:'center',
      borderColor:'black',
      borderWidth:1
    },

    view3:{
        flexDirection:'column',
        justifyContent:'center',
        padding:10,
        marginLeft:50
    },
    view4:{
         flexDirection:'row',
         height:60,
         flex:5,
         padding:20,
         justifyContent:'center',
         alignItems:'center',
         borderBottomColor:'#383838',
         borderBottomWidth:.5
        },
        view5:{
            flexDirection:'column',
            flex:3,

        },
    man:{
        height:100,
        width:100,
        borderRadius:100,
       borderColor:'black',
       borderWidth:1
    },
    text1:{
      fontSize:15,
      fontWeight:'bold',
      color:'black'
    },
    text2:{
        color:'black',
        fontWeight:'bold',
        fontSize:18
    },

    text3:{
        color:'#007ACC'
    },
    text4:{
        fontSize:15,
        fontWeight:'bold',
        color:'black'
    },

  logo:{
    height:50,
    width:'100%',
    resizeMode:'contain',
    marginTop:60

  },
  heading:{
    marginTop:5,
    color:'black',
    textAlign:'center'
  },
  Signup:{
    marginTop:5,
    color:'black',
    textAlign:'left',
    marginTop:60,
    fontSize:18
  },
  img:{
    height:25,
    width: 25,
    flex:1,
    resizeMode:'contain',
  },
  img1:{
    height:15,
    width: 15,
    flex:1,
    resizeMode:'contain',
  },
  imgnew:{
    height:25,
    width: 25,
    
    resizeMode:'contain',
  },
  modal: {
    flex: 1,
    
    backgroundColor: 'white',
    
 },
 scene: {
  flex: 1,
  backgroundColor:'pink'

},


  
});







