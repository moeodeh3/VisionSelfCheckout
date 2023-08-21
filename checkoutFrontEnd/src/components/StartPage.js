import React from "react"
import './StartPage.css'


export default function StartPage(props){




    return (

        <body>

            <div className="main">
               
               <div className="main--images">
                   <img src="./images//Mastercard-Symbol.jpg"  className="masterCard"/>
                   <img src="./images//visa-logo.jpg"  className="visa"/>
                   <img src="./images//InteracLogo.png"  className="interac"/>
               </div>
   
               <img src="./images//start-button.png"  className="start-button" onClick={props.changePage}  />
               
   
               
       
           </div>





        </body>
        
        




    )

}