import {useRouter} from 'next/router'
let gumStream = null;
let recorder = null;
let audioContext = null;
let audioBlob = null;
export default function Registration()
{
  const router = useRouter(); // import `useRouter` from next/router
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
      
   
  formData.append('files.PledgeVoice', audioBlob, "recording.wav");
  formData.append('data',jsonData);
  
     
      const config = {
          headers: {'content-type': 'multipart/form-data'}
      }
    
      fetch(process.env.API_PATH, {
      method: 'post',
      body: formData
    }).then(response => {
      if(response.status===200)
      {
        console.log("response...",response);
        router.replace("/thank-you");
      }
      
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
          <div className="container mt-3">
          <div className="row justify-content-center">
          <div className="col-md-8">
          <div className="banner">
          
          </div>
          </div>
          </div>
          <div className="row justify-content-center">
          
          <div className="col-md-8">
        
        <form name="form" action="/" >
        
          {/* <p>Jal Sapath</p> */}
          <div className="col-md-6">
            <label htmlFor="Name">Name<span>*</span></label>
            <input id="Name" type="text" name="Name" required/>
          </div>
        
          <div className="col-md-6">
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
          <div className="col-md-6 p-3" >
              <button onClick={startRecording} type="button">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-mic" viewBox="0 0 16 16">
    <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z"/>
    <path d="M10 8a2 2 0 1 1-4 0V3a2 2 0 1 1 4 0v5zM8 0a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V3a3 3 0 0 0-3-3z"/>
  </svg>
              </button>
              <button onClick={stopRecording} type="button" className="button">Stop</button>
          </div>
          <div className="btn-block">
            <button type="button" onClick={onSubmit}>SUBMIT</button>
          </div>
        </form>
      </div>
      </div>
    </div>
         </>
         )
}
