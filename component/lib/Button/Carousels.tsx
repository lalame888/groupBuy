import { faChevronCircleLeft, faChevronCircleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { CSSProperties } from 'react';
import styled  from "styled-components";


interface CarouselsProps  extends React.HTMLAttributes<HTMLDivElement>{
    direct: 'left' | 'right';
    onClick(): void;
    color?: string;
    size?: string;
    style?: CSSProperties
    iconStyle?: CSSProperties
}

const StyledCarousel = (styled.div)<CarouselsProps>`
  position: absolute;
  height: 100%;
  padding-left: 30px;
  padding-right: ${props => (props.direct === 'right' ? '50px' : '50px')};
  margin-left: ${props => (props.direct === 'right' ? '20px' : '-50vw')};
  width: 50vw;
  cursor: pointer;
  top: 0px;
  background: none;
  
  &hover:{
    background: ${props =>
        `-webkit-linear-gradient(${props.direct}, #bbbbbbe6, #dadada4a)`
      };
  }
`;


const StyledIcon = styled.div<Partial<CarouselsProps>>`
  height: 100%;
  padding: 10px;
  display: flex;
  font-size: ${props => props.size || '40px'};
  color: ${props => (props.color || 'white')};
  align-items: center;
  justify-content: center;

  &:hover:{
    color: gray;
  }

`;

export function Carousels(props: CarouselsProps) {
    return (
        <StyledCarousel 
            direct={props.direct}
            style={props.style}
            onClick={props.onClick}
        >
            <StyledIcon  style={props.iconStyle} size={props.size} color={props.color}>
                { (props.direct === 'left')? 
                    <FontAwesomeIcon icon={faChevronCircleLeft}/>:
                    <FontAwesomeIcon icon={faChevronCircleRight}/>
                }
            </StyledIcon>
        </StyledCarousel>
    );
}
export default Carousels;


