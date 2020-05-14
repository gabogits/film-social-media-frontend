const previewImg = (e, savePictureToUpload) => {
    if (e.target.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
        savePictureToUpload(e.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };



export default previewImg;