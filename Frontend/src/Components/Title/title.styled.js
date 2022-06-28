import styled from 'styled-components';

export const TitleGames = styled.h2`
font-size: 1.25rem;
font-weight: 600 ;
margin-bottom: ${({margin})=> margin || '1rem'};
position: relative;
text-shadow: 1px 1px 0.5px #000;

:before{
    position:absolute ;
    content: '';
    width: 3rem ;
    height: 3px ;
    bottom: -3px;
    background:var(--primary) ;
}
`