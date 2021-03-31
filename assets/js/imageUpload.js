const setImage=(image)=>{
    document.getElementById("spinner").className="spinner-border"
    const data=new FormData()
    data.append("file", image)
    data.append("upload_preset", "insta_clone")
    data.append("cloud_name", "dm36weewi")
    fetch("https://api.cloudinary.com/v1_1/dm36weewi/image/upload",{
      method:"post",
      body:data
    }).then(res=>res.json()).then(data=>{

      if(data.error){
          setUrl("")
      }else{
        setUrl(data.url)
      }

    }

    )}
const setUrl=(url)=>{
    if(url){
    document.getElementById("spinner").className=""
    // document.getElementById('url').innerHTML=url
    document.getElementById('url').value=url
    }
}