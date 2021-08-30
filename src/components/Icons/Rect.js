import * as React from 'react' 
import SvgIcon from '@material-ui/core/SvgIcon';

const SvgComponent = props => (
        <svg {...props}   version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 512 512" style={{enableBackground:'new 0 0 330 330'}}>
          <g>
            <path d="M407,76H105C47.109,76,0,123.109,0,181v150c0,57.891,47.109,105,105,105h302c57.891,0,105-47.109,105-105V181    C512,123.109,464.891,76,407,76z"/>
          </g>
        </svg>
  )

export const RectIcon = (props) => {
    return (
      <SvgIcon {...props}>
        <SvgComponent/>
      </SvgIcon>
    );
  }