import * as React from 'react' 
import SvgIcon from '@material-ui/core/SvgIcon';

const SvgComponent = props => (
        <svg {...props}   version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 977.7 977.7" style={{enableBackground:'new 0 0 977.7 977.7'}}>
          <g xmlns="http://www.w3.org/2000/svg">
	        <path d="M770.7,930.6v-35.301c0-23.398-18-42.898-41.3-44.799c-17.9-1.5-35.8-3.1-53.7-5c-34.5-3.6-72.5-7.4-72.5-50.301L603,131.7   c136-2,210.5,76.7,250,193.2c6.3,18.7,23.8,31.3,43.5,31.3h36.2c24.9,0,45-20.1,45-45V47.1c0-24.9-20.1-45-45-45H488.9h-0.2H45   c-24.9,0-45,20.1-45,45v264.1c0,24.9,20.1,45,45,45h36.2c19.7,0,37.2-12.6,43.5-31.3c39.4-116.5,114-195.2,250-193.2l-0.3,663.5   c0,42.9-38,46.701-72.5,50.301c-17.9,1.9-35.8,3.5-53.7,5c-23.3,1.9-41.3,21.4-41.3,44.799V930.6c0,24.9,20.1,45,45,45h236.8h0.3   h236.7C750.5,975.6,770.7,955.401,770.7,930.6z"/>
          </g>
        </svg>
  )

export const TextIcon = (props) => {
    return (
      <SvgIcon {...props}>
        <SvgComponent/>
      </SvgIcon>
    );
  }