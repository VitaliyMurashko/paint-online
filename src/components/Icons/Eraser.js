import * as React from 'react' 
import SvgIcon from '@material-ui/core/SvgIcon';

const SvgComponent = props => (
      <svg  {...props}  version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 330 330" style={{enableBackground:'new 0 0 330 330'}} >
        <g id="XMLID_29_">
            <path id="XMLID_30_" d="M315,285H201.213L60,143.787L4.394,199.393C1.582,202.206,0,206.022,0,210   c0,3.977,1.582,7.793,4.394,10.606l90,90C97.207,313.419,101.021,315,105,315h60c0.004,0,0.006-0.001,0.009,0H315   c8.285,0,15-6.716,15-15C330,291.716,323.285,285,315,285z"/>
            <path id="XMLID_31_" d="M205.607,19.394c-5.857-5.858-15.355-5.858-21.213-0.001L81.214,122.575l141.213,141.213l103.181-103.181   c5.857-5.857,5.857-15.355,0-21.213L205.607,19.394z"/>
        </g>
    </svg>
  )

export const EraserIcon = (props) => {
    return (
      <SvgIcon {...props}>
        <SvgComponent/>
      </SvgIcon>
    );
  }