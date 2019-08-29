import styled from 'styled-components';

const Styles = {
    Container: styled.div`
        display: flex;
        flex-direction: column;
        align-items: center;
    `,
    ContentDiv: styled.div`
        margin-top: 2%;
        display: grid;
        width: 100%;
        height: 100%;
        grid-template-columns: 30% 40% 30%;
    `,
    ChatDiv: styled.div`
        margin-right: 10%;
        margin-left: 30%;
        height: 100%;
    `,
    BoardDiv: styled.div`
        width: 100%;
        height: 100%;
    `,
    Dummy: styled.div`
        margin-top: 100%;
    `
};

export default Styles;