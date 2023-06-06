function success(){
  alert("Успішно записано в БД");
}

async function test() {
  const url = 'https://api.crowdin.com/api/v2/projects/592935/directories';
  const response = await fetch(url, {
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer 04e7a28c07d7734e1c64a70c7e7df80a1c8ce47c47b690ff03940126d59aa8102ff436605f371a5d',
        },
    });

    // const res_data = await response.text();
    // console.log(res_data);
    var parsedData = [];
          var res_data = `{"data":[{"id":"981","type":null,"status":"1","parent_id":"0","node_type":"0","extension":"","priority":"1","export_pattern":"","name":"Empty folder","title":"Some title","strings":1,"words":0,"has_files":true}]}`;
          try {
            parsedData = JSON.parse(res_data);
            console.log(parsedData.data);
          } catch(e) {
            console.log("cant parse json", e);
          }
          var crowdinFiles = document.querySelector("crowdin-files-component");
          crowdinFiles && crowdinFiles.setAttribute("is-loading", true);
          
            crowdinFiles && crowdinFiles.setFilesData(parsedData.data);
            crowdinFiles && crowdinFiles.removeAttribute("is-loading");
          
}
