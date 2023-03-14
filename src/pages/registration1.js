let gumStream = null;
let recorder = null;
let audioContext = null;
let audioBlob = null;
export default function Registration()
{
    const startRecording = () => {
        let constraints = {
            audio: true,
            video: false
        }

        audioContext = new window.AudioContext();
        console.log("sample rate: " + audioContext.sampleRate);

        navigator.mediaDevices
            .getUserMedia(constraints)
            .then(function (stream) {
                console.log("initializing Recorder.js ...");

                gumStream = stream;

                let input = audioContext.createMediaStreamSource(stream);

                recorder = new window.Recorder(input, {
                    numChannels: 1
                })

                recorder.record();
                console.log("Recording started");
            }).catch(function (err) {
                //enable the record button if getUserMedia() fails
        });

    }

    const onSubmit = () => {
      let formData = new FormData();
      let jsonData="{\"Name\": ~Name~, \"PhoneNumber\": ~PhoneNumber~, \"IPledge\": true}";
        
      Array.prototype.forEach.call(form.elements, ({ name, type, value, files, ...element }) => {
        if (!['submit', 'file'].includes(type)) {
         
          if(name && value)
          {
            
            if(type==='number')
            {
              //data[`"${name}"`] = Number(value);
              jsonData=jsonData.replace(/~PhoneNumber~/gi,Number(value));
              
            }
            else  
            {
              const nameValue = String(value);
             // console.log("value...",JSON.parse(nameValue));
              //data[`"${name}"`] = nameValue;
              jsonData=jsonData.replace('~Name~',`"${nameValue}"`);
              
              //data[`"${name}"`] = data[`"${name}"`].replace(`'`, `"`);//value
             
            }
            
          }
          
        } else if (type === 'file') {
          files.forEach((file) => {
           // formData.append(`files.${name}`, file, file.name);
          });
        }
      });
     // data[`"IPledge"`] = true;
      
 /*  form.elements
    .forEach(({ name, type, value, files, ...element }) => {
      if (!['submit', 'file'].includes(type)) {
        data[name] = value;
      } else if (type === 'file') {
        files.forEach((file) => {
          formData.append(`files.${name}`, file, file.name);
        });
      }
    }); */
  
  formData.append('files.PledgeVoice', audioBlob, "recording.wav");
  formData.append('data',jsonData);
  
      //data.append('text', "this is the transcription of the audio file");
      //data.append('wavfile', blob, "recording.wav");
      //console.log("formData...",formData);
     // console.log("data...",(0, eval)('(' + data + ')'));
     // console.log("name...",data["Name"]);
      //console.log("data...",jsonData);
      //console.log("blob...",blob);
      const config = {
          headers: {'content-type': 'multipart/form-data'}
      }
     // console.log("data...",data);
      //axios.post('http://localhost:1337/api/jal-jan-pledges', formData);
     //axios.post('http://20.198.73.179:1337/api/upload', data, config);
      fetch('http://20.198.73.179:1337/api/jal-jan-pledges', {
      method: 'post',
      body: formData
    }).then(response => {
      console.log("response...",response);
  })
  .catch(error => {
      // handle the error
  }); 
  }
    const stopRecording = () => {
        console.log("stopButton clicked");

        recorder.stop(); //stop microphone access
        gumStream.getAudioTracks()[0].stop();

        recorder.exportWAV(onStop);
    }

    const onStop = (blob) => {
        console.log("uploading...");

        audioBlob=blob;
       

      //  const data = {};
      
    }
    return(
        <>
          <div className="testbox">
      <form name="form" action="/">
        <div className="banner">
          <h1></h1>
        </div>
        <p>Jal Sapath</p>
        <div className="item">
          <label htmlFor="Name">Name<span>*</span></label>
          <input id="Name" type="text" name="Name" required/>
        </div>
      {/*   <div className="item">
          <label for="email">Email Address<span>*</span></label>
          <input id="email" type="email" name="email" required/>
        </div>
        <div className="item">
          <label for="address">Address<span>*</span></label>
          <input id="address" type="address" name="address" required/>
        </div>
        <div className="item">
          <label for="city">City<span>*</span></label>
          <input id="city" type="text" name="city" required/>
        </div>
        <div className="item">
          <label for="state">State<span>*</span></label>
          <input id="state" type="text" name="state" required/>
        </div>
        <div className="item">
          <label for="zip">Zip<span>*</span></label>
          <input id="zip" type="text" name="zip" required/>
        </div> */}
        

        <div className="item">
          <label htmlFor="PhoneNumber">Phone<span>*</span></label>
          <input id="PhoneNumber" type="number" name="PhoneNumber" required/>
        </div>

        <div className="question">
          <label>I pledge</label>
          <div className="question-answer">
            <div>
              <input type="radio" value="none" id="radio_1" name="pledge"/>
              <label htmlFor="radio_1" className="radio"><span>Yes</span></label>
            </div>
            <div>
              <input  type="radio" value="none" id="radio_2" name="pledge"/>
              <label htmlFor="radio_2" className="radio"><span>No</span></label>
            </div>
          </div>
        </div>
        <div className="item" >
            <button onClick={startRecording} type="button">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-mic" viewBox="0 0 16 16">
  <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z"/>
  <path d="M10 8a2 2 0 1 1-4 0V3a2 2 0 1 1 4 0v5zM8 0a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V3a3 3 0 0 0-3-3z"/>
</svg>
              </button>
            <button onClick={stopRecording} type="button">Stop</button>
        </div>
        <div className="btn-block">
          <button type="button" onClick={onSubmit}>SUBMIT</button>
        </div>
      </form>
    </div>
         </>
         )
}
