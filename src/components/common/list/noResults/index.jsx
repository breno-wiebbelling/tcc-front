import React from "react"
import FolderOffIcon from '@mui/icons-material/FolderOff';
import NoContentStyled from './style'

export default ({ contentName }) => {
  return (
    <NoContentStyled>
      <div className="top">
        <div className="icon">
          <FolderOffIcon className="iconElement"/>
        </div>
      </div>
      <div className="content">
        <p>Você ainda não tem nenhuma {contentName} registrada.</p>
      </div>
    </NoContentStyled>
  )
}