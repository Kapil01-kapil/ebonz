import { newpostConstants,postConstants } from '../Constants';
import { postService } from '../Services';
import { alertActions } from './alert.actions';
import CompressImage from 'react-native-compress-image';
import { ProcessingManager } from 'react-native-video-processing';

export const  newpostActions = {  
    add, 
    clear, 
    addVideos,
    addImages,
    addMedia,
    addTitle,
    addDescription,
    addPrice,
    addParameters
};


function add(data) {
    return dispatch => {
        dispatch(request());
        console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
console.log(data);

        postService.addPost(data)
            .then(
                post =>{
                  if(post.success)
                  { dispatch(success(post)) 
                    dispatch({type:postConstants.ADD_MYPOST_SUCCESS,post: post.post})
                  }

                   else dispatch(failure(post.message))
                  },
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: newpostConstants.ADD_NEW_POST_REQUEST  } }
    function success(post) { return { type: newpostConstants.ADD_NEW_POST_SUCCESS, post } }
    function failure(error) { return { type: newpostConstants.ADD_NEW_POST_FAILURE, error } }
}

function addVideos(videoList)
{
    return dispatch=>{
        dispatch(request()); 
        console.log('Video List from action',videoList)
        dispatch(success(videoList));
        // if(videoList.length>0)
        // compressVideo(videoList[0]).then(videos=>{
        //   console.log('LOGGING COMPRESSED VIDEOS : ',videos)  
        //   dispatch(success(videos));
        // },err=>{
        //    dispatch(failure(err))
        // })
    
//return videos;
    }
    function request() { return { type: newpostConstants.ADD_VIDEOS_REQUEST  } }
    function success(videos) { return { type: newpostConstants.ADD_VIDEOS_SUCCESS, videos} }
    function failure(error) { return { type: newpostConstants.ADD_VIDEOS_FAILURE, error } }
}

// function addImages(imageList)
// {
//   console.log('Logging image list');
//   console.log(imageList);
//     return dispatch=>{
//         dispatch(request());
//         compressAllImages(imageList).then(
//           images=>{               
//             console.log('LOGGING COMPRESSED IMAGES : ',images)  
//             dispatch(success(images))},
//             err=>{
//             dispatch(failure(err));
//         }) ;  
//     }
//     function request() { return { type: newpostConstants.ADD_PHOTOS_REQUEST  } }
//     function success(images) { return { type: newpostConstants.ADD_PHOTOS_SUCCESS, images} }
//     function failure(error) { return { type: newpostConstants.ADD_PHOTOS_FAILURE, error } }
// }

function addImages(imageList)
{
  console.log('Logging image list');
  console.log(imageList);
    return dispatch=>{
        dispatch(request());
        
            dispatch(success(imageList));
            
    }
    function request() { return { type: newpostConstants.ADD_PHOTOS_REQUEST  } }
    function success(images) { return { type: newpostConstants.ADD_PHOTOS_SUCCESS, images} }
    function failure(error) { return { type: newpostConstants.ADD_PHOTOS_FAILURE, error } }
}


function addMedia(medias) {
  return { type: newpostConstants.ADD_MEDIAS_SUCCESS,medias };
}

function addTitle(title) {
  return { type: newpostConstants.ADD_POST_TITLE,title };
}

function addDescription(description) {
  return { type: newpostConstants.ADD_POST_DESCRIPTION,description };
}

function addPrice(price) {
  return { type: newpostConstants.ADD_POST_PRICE,price };
}
function addParameters(params) {
  return { type: newpostConstants.ADD_POST_PARAMS,params };
}

function clear() {
    return { type: newpostConstants.CLEAR_NEW_POST_DATA };
}


function compressImg(image)
{  console.log('compressing images......',image);
  return  CompressImage.createCustomCompressedImage(image.data.uri, '', 500, 500, 50).then((res) => {
    
    const data= {data:{
      filename:res.name,
      uri:res.uri,
      height:500,
      width:500,
    },
    id:image.id
    }
    console.log('Logging compressed image :',data);
    return data;   
  // response.uri is the URI of the new image that can now be displayed, uploaded...
  // response.path is the path of the new image
  // response.name is the name of the new image with the extension
  // response.size is the size of the new image
}).catch((err) => {
  console.log(err);    
});
}

function compressAllImages(images)
{
return new Promise((resolve,reject)=>{
  const arr=[]
  let i=0;
  images.forEach(async img => {
    const image=await compressImg(img); 
     console.log('img',image)
     arr.push(image);
     i++;
     if(i==images.length-1)
      resolve(arr);  
  });  


})
}

function compressVideo(source){ 
    return new Promise((resolve,reject)=>{
    
    const options = {
      width: 720,
      height: 1280,
      bitrateMultiplier: 3,
      saveToCameraRoll: true, // default is false, iOS only
      saveWithCurrentDate: true, // default is false, iOS only
      minimumBitrate: 300000,
      removeAudio: true, // default is false
  }; 
  console.log('Logging video source',source);
    ProcessingManager.compress(source.data.uri, options) // like VideoPlayer compress options
    .then((data) =>{ 
      const final= {data:{
        filename:source.data.filename,
        uri:data.source,
        playableDuration:source.data.playableDuration,
        height:1280,
        width:720,
      },
      id:source.id
      }
      console.log('Video compressed .',data);
      resolve(final);
     //  resolve(data);
  }).catch(err=>{console.log('Logging Error',err)});
    })
  }