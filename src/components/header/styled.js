import styled from "styled-components";
import { smokeBlack, headerHeight, smokeWhiteLight, smokeWhiteLightHover } from "../common/style/index";

export default styled.div`

    height: ${headerHeight};
    width: 100%;
    padding: 0px 2.5%;
    box-sizing: border-box;

    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: white;

    .left_box {
        width: 75%;
        height: 100%;
        display: flex;
        justify-content: start;
    }

    .left_box .links, .left_box .icon {
        display: flex;
        height: 100%;
        align-items: center;
    }

    .left_box .icon {
        margin-right: 2.5%;
    }

    .links * {
        text-decoration: none;
        font-weight: 700;
        color: ${smokeBlack};
        line-height: 0%;
        letter-spacing: 1.5px;
    }

    .links a:hover {
        color: navy;
        text-decoration: underline;
    }

    .header_dropdown_options {
        -webkit-box-shadow: 0px 5px 10px 3px rgba(153, 153, 153, 0.63);
        -moz-box-shadow: 0px 5px 10px 3px rgba(153, 153, 153, 0.63);
        box-shadow: 0px 5px 10px 3px rgba(153, 153, 153, 0.63);
    }

    .dropdownOption {
        height: 35px;
        width: 120px;

        display: flex;
        align-items: center;
        justify-content: center;
    }

    .dropdownOption:hover {
        background-color: ${smokeWhiteLightHover};
    }

    .dropdownOption:active {
        background-color: ${smokeWhiteLight};
    }


`