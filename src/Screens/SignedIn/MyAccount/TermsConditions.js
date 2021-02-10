import React, { Component, } from 'react';
import {StyleSheet,Text, View, ScrollView} from 'react-native';
import {Container} from '../../../Components'
import { connect } from 'react-redux';
class TermsConditions extends Component {
constructor(props) {
    super(props);

    this.state={number:null,contry:null,username:null,modalVisible: false, index: 0,}
   
}



     
  render() {
const {colors}=this.props;
    return (
  
   <Container >             
          <ScrollView style={{padding:10}}>

        <View style={{marginVertical:5,borderBottomWidth:1,marginBottom:10,borderColor:colors.FOREGROUND_DARK}}>

          <Text style={{fontSize:14,fontWeight:'bold'}}>CONDITIONS OF USE</Text>
        <Text style={{marginVertical:5,color:colors.FOREGROUND_DARK}}>Welcome to our online store! EbonZ and its associates provide their services to you subject to the following conditions. If you visit or shop within this website, you accept these conditions. Please read them carefully. ​</Text>
        </View>

        <View style={{marginVertical:5,borderBottomWidth:1,borderColor:colors.FOREGROUND_DARK,marginBottom:10}}>

<Text style={{fontSize:14,fontWeight:'bold'}}>PRIVACY</Text>
<Text style={{marginVertical:5,color:colors.FOREGROUND_DARK}}>Please review our Privacy Notice, which also governs your visit to our website, to understand our practices.​</Text>
</View>

<View style={{marginVertical:5,borderBottomWidth:1,borderColor:colors.FOREGROUND_DARK,marginBottom:10}}>

<Text style={{fontSize:14,fontWeight:'bold'}}>ELECTRONIC COMMUNICATIONS</Text>
<Text style={{marginVertical:5,color:colors.FOREGROUND_DARK}}>When you visit EbonZ or send e-mails to us, you are communicating with us electronically. You consent to receive communications from us electronically. We will communicate with you by e-mail or by posting notices on this site. You agree that all agreements, notices, disclosures and other communications that we provide to you electronically satisfy any legal requirement that such communications be in writing.</Text>
</View>

<View style={{marginVertical:5,borderBottomWidth:1,borderColor:colors.FOREGROUND_DARK,marginBottom:10}}>

<Text style={{fontSize:14,fontWeight:'bold'}}>COPYRIGHT</Text>
<Text style={{marginVertical:5,color:colors.FOREGROUND_DARK}}>All content included on this site, such as text, graphics, logos, button icons, images, audio clips, digital downloads, data compilations, and software, is the property of EbonZ or its content suppliers and protected by international copyright laws. The compilation of all content on this site is the exclusive property of EbonZ, with copyright authorship for this collection by EbonZ, and protected by international copyright laws.</Text>
</View>

<View style={{marginVertical:5,borderBottomWidth:1,borderColor:colors.FOREGROUND_DARK,marginBottom:10}}>

<Text style={{fontSize:14,fontWeight:'bold'}}>TRADE MARKS</Text>
<Text style={{marginVertical:5,color:colors.FOREGROUND_DARK}}>EbonZs trademarks and trade dress may not be used in connection with any product or service that is not EbonZs, in any manner that is likely to cause confusion among customers, or in any manner that disparages or discredits EbonZ. All other trademarks not owned by EbonZ or its subsidiaries that appear on this site are the property of their respective owners, who may or may not be affiliated with, connected to, or sponsored by EbonZs or its subsidiaries.</Text>
</View>

<View style={{marginVertical:5,borderBottomWidth:1,borderColor:colors.FOREGROUND_DARK,marginBottom:10}}>

<Text style={{fontSize:14,fontWeight:'bold'}}>LICENSE AND SITE ACCESS</Text>
<Text style={{marginVertical:5,color:colors.FOREGROUND_DARK}}>EbonZ grants you a limited license to access and make personal use of this site and not to download (other than page caching) or modify it, or any portion of it, except with express written consent of EbonZ. This license does not include any resale or commercial use of this site or its contents: any collection and use of any product listings, descriptions, or prices: any derivative use of this site or its contents: any downloading or copying of account information for the benefit of another merchant: or any use of data mining, robots, or similar data gathering and extraction tools. This site or any portion of this site may not be reproduced, duplicated, copied, sold, resold, visited, or otherwise exploited for any commercial purpose without express written consent of EbonZ. You may not frame or utilize framing techniques to enclose any trademark, logo, or other proprietary information (including images, text, page layout, or form) of EbonZ and our associates without express written consent. You may not use any meta tags or any other "hidden text" utilizing EbonZs name or trademarks without the express written consent of EbonZ. Any unauthorized use terminates the permission or license granted by EbonZ. You are granted a limited, revocable, and nonexclusive right to create a hyperlink to the home page of EbonZ so long as the link does not portray EbonZ, its associates, or their products or services in a false, misleading, derogatory, or otherwise offensive matter. You may not use any EbonZ logo or other proprietary graphic or trademark as part of the link without express written permission.</Text>
</View>


<View style={{marginVertical:5,borderBottomWidth:1,borderColor:colors.FOREGROUND_DARK,marginBottom:10}}>

<Text style={{fontSize:14,fontWeight:'bold'}}>YOUR MEMBERSHIP ACCOUNT</Text>
<Text style={{marginVertical:5,color:colors.FOREGROUND_DARK}}>If you use this site, you are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer, and you agree to accept responsibility for all activities that occur under your account or password. If you are under 18, you may use our website only with involvement of a parent or guardian. EbonZ and its associates reserve the right to refuse service, terminate accounts, remove or edit content, or cancel orders in their sole discretion.</Text>
</View>

<View style={{marginVertical:5,borderBottomWidth:1,borderColor:colors.FOREGROUND_DARK,marginBottom:10}}>

<Text style={{fontSize:14,fontWeight:'bold'}}>REVIEWS, COMMENTS, EMAILS, AND OTHER CONTENT</Text>
<Text style={{marginVertical:5,color:colors.FOREGROUND_DARK}}>Visitors may post reviews, comments, and other content: and submit suggestions, ideas, comments, questions, or other information, so long as the content is not illegal, obscene, threatening, defamatory, invasive of privacy, infringing of intellectual property rights, or otherwise injurious to third parties or objectionable and does not consist of or contain software viruses, political campaigning, commercial solicitation, chain letters, mass mailings, or any form of "spam." You may not use a false e-mail address, impersonate any person or entity, or otherwise mislead as to the origin of a card or other content. EbonZ reserves the right (but not the obligation) to remove or edit such content, but does not regularly review posted content. If you do post content or submit material, and unless we indicate otherwise, you grant EbonZ and its associates a nonexclusive, royalty-free, perpetual, irrevocable, and fully sublicensable right to use, reproduce, modify, adapt, publish, translate, create derivative works from, distribute, and display such content throughout the world in any media. You grant EbonZ and its associates and sublicensees the right to use the name that you submit in connection with such content, if they choose. You represent and warrant that you own or otherwise control all of the rights to the content that you post: that the content is accurate: that use of the content you supply does not violate this policy and will not cause injury to any person or entity: and that you will indemnify EbonZ or its associates for all claims resulting from content you supply. EbonZ has the right but not the obligation to monitor and edit or remove any activity or content. EbonZ takes no responsibility and assumes no liability for any content posted by you or any third party.</Text>
</View>


<View style={{marginVertical:5,borderBottomWidth:1,borderColor:colors.FOREGROUND_DARK,marginBottom:10}}>

<Text style={{fontSize:14,fontWeight:'bold'}}>RISK OF LOSS</Text>
<Text style={{marginVertical:5,color:colors.FOREGROUND_DARK}}>All items purchased from EbonZ are made pursuant to a shipment contract. This basically means that the risk of loss and title for such items pass to you upon our delivery to the carrier.</Text>
</View>

<View style={{marginVertical:5,borderBottomWidth:1,borderColor:colors.FOREGROUND_DARK,marginBottom:10}}>

<Text style={{fontSize:14,fontWeight:'bold'}}>PRODUCT DESCRIPTIONS</Text>
<Text style={{marginVertical:5,color:colors.FOREGROUND_DARK}}>EbonZ and its associates attempt to be as accurate as possible. However, EbonZ does not warrant that product descriptions or other content of this site is accurate, complete, reliable, current, or error-free. If a product offered by EbonZ itself is not as described, your sole remedy is to return it in unused condition.</Text>
</View>

<View style={{marginVertical:5,borderBottomWidth:1,borderColor:colors.FOREGROUND_DARK,marginBottom:10}}>

<Text style={{marginVertical:5,color:colors.FOREGROUND_DARK}}>DISCLAIMER OF WARRANTIES AND LIMITATION OF LIABILITY THIS SITE IS PROVIDED BY EbonZ ON AN "AS IS" AND "AS AVAILABLE" BASIS. EbonZ MAKES NO REPRESENTATIONS OR WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, AS TO THE OPERATION OF THIS SITE OR THE INFORMATION, CONTENT, MATERIALS, OR PRODUCTS INCLUDED ON THIS SITE. YOU EXPRESSLY AGREE THAT YOUR USE OF THIS SITE IS AT YOUR SOLE RISK. TO THE FULL EXTENT PERMISSIBLE BY APPLICABLE LAW, EbonZ DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE. EbonZ DOES NOT WARRANT THAT THIS SITE, ITS SERVERS, OR E-MAIL SENT FROM EbonZ ARE FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS. EbonZ WILL NOT BE LIABLE FOR ANY DAMAGES OF ANY KIND ARISING FROM THE USE OF THIS SITE, INCLUDING, BUT NOT LIMITED TO DIRECT, INDIRECT, INCIDENTAL, PUNITIVE, AND CONSEQUENTIAL DAMAGES. CERTAIN STATE LAWS DO NOT ALLOW LIMITATIONS ON IMPLIED WARRANTIES OR THE EXCLUSION OR LIMITATION OF CERTAIN DAMAGES. IF THESE LAWS APPLY TO YOU, SOME OR ALL OF THE ABOVE DISCLAIMERS, EXCLUSIONS, OR LIMITATIONS MAY NOT APPLY TO YOU, AND YOU MIGHT HAVE ADDITIONAL RIGHTS.</Text>
</View>

<View style={{marginVertical:5,borderBottomWidth:1,borderColor:colors.FOREGROUND_DARK,marginBottom:10}}>

<Text style={{fontSize:14,fontWeight:'bold'}}>APPLICABLE LAW</Text>
<Text style={{marginVertical:5,color:colors.FOREGROUND_DARK}}>By visiting EbonZ, you agree that the laws of the state of Delhi, India, without regard to principles of conflict of laws, will govern these Conditions of Use and any dispute of any sort that might arise between you and EbonZ or its associates.</Text>
</View>

<View style={{marginVertical:5,borderBottomWidth:1,borderColor:colors.FOREGROUND_DARK,marginBottom:10}}>

<Text style={{fontSize:14,fontWeight:'bold'}}>DISPUTES</Text>
<Text style={{marginVertical:5,color:colors.FOREGROUND_DARK}}>Any dispute relating in any way to your visit to EbonZ or to products you purchase through EbonZ shall be submitted to confidential arbitration in DEFINE_STATE, DEFINE_COUNTRY, except that, to the extent you have in any manner violated or threatened to violate MYCOMPANYs intellectual property rights, EbonZ may seek injunctive or other appropriate relief in any state or federal court in the state of DEFINE_STATE, DEFINE_COUNTRY, and you consent to exclusive jurisdiction and venue in such courts. Arbitration under this agreement shall be conducted under the rules then prevailing of the American Arbitration Association. The arbitrators award shall be binding and may be entered as a judgment in any court of competent jurisdiction. To the fullest extent permitted by applicable law, no arbitration under this Agreement shall be joined to an arbitration involving any other party subject to this Agreement, whether through class arbitration proceedings or otherwise.</Text>
</View>
<View style={{marginVertical:5,borderBottomWidth:1,borderColor:colors.FOREGROUND_DARK,marginBottom:10}}>

<Text style={{fontSize:14,fontWeight:'bold'}}>SITE POLICIES, MODIFICATION, AND SEVERABILITY</Text>
<Text style={{marginVertical:5,color:colors.FOREGROUND_DARK}}>Please review our other policies, such as our Shipping and Returns policy, posted on this site. These policies also govern your visit to EbonZ. We reserve the right to make changes to our site, policies, and these Conditions of Use at any time. If any of these conditions shall be deemed invalid, void, or for any reason unenforceable, that condition shall be deemed severable and shall not affect the validity and enforceability of any remaining condition.</Text>
</View>

<View style={{marginVertical:5,borderBottomWidth:1,borderColor:colors.FOREGROUND_DARK,marginBottom:10}}>

<Text style={{fontSize:14,fontWeight:'bold'}}>QUESTIONS</Text>
<Text style={{marginVertical:5,color:colors.FOREGROUND_DARK}}>Questions regarding our Conditions of Usage, Privacy Policy, or other policy related material can be directed to our support staff by clicking on the "Contact Us" link in the side menu. Or you can email us at: support@ebonz.in</Text>
</View>
            </ScrollView>

            </Container>

    );
  }

}

function mapStateToProps(state) {
    const { colors } = state;
  
    
    return {
      colors
    };
  }
  
  const connectedTermsConditions = connect(mapStateToProps)(TermsConditions);
  export { connectedTermsConditions as TermsConditions };

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







