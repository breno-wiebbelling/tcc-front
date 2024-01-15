import React, {useEffect} from 'react';
import SimulationListStyled from "./style"
import NoResults from '../noResults';
import AddIcon from '@mui/icons-material/Add';
import Tooltip from '@mui/material/Tooltip';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import { smokeWhite, whiteHover } from '../../style';

export default function BasicTable({ getWithPage, listName, elementName, elementFieldDetails, addAction, elements, setElements }) {

  const [page, setPage] = React.useState(1);
  const [count, setCount] = React.useState(0);

  const elementClick = elementFieldDetails["actions"].filter(element => element.name === "onElementClick")[0]["function"];
  const deleteElement = async (element) => {
    let func = elementFieldDetails["actions"].filter(element => element.name === "deleteElement")[0]["function"];
    
    if(!func) { return null  }
    
    await func(element);
    loadElements();
  } 
  const loadElements = async () => {
    getWithPage(page)
    .then(clientResponse => {
      setElements(clientResponse.list);
      setCount(clientResponse.pages)
    })
  }

  const reloadElements = (page) => {
    setPage(page)
    getWithPage(page)
    .then(clientResponse => {
      setElements(clientResponse.list);
    })
  }

  useEffect(() => {
    loadElements();
  }, [])

  useEffect(() => {
    getWithPage(page).then(clientResponse => { setCount(clientResponse.pages) })
  }, [elements])

  return (
    <SimulationListStyled>
      <div className="list_top">
        <h4>{listName}</h4>
        <div className="actions">
          <button onClick={ addAction } className='display_flex_center'>
            <AddIcon className='add_icon'/>
            <span>criar {elementName}</span>
          </button>
        </div>
      </div>
      <div className="list_display">
        {
          elements.length===0 && <NoResults contentName={elementName}/>
        }
        { 
          elements.length>0 &&
          <div className='list_container'>
            <div className='list_elements'>
              <div className="list_element list_header">
                {
                  elementFieldDetails["names"].map(elementFieldName => {

                    let index = elementFieldDetails["names"].indexOf(elementFieldName);
                    return (
                      <div className='list_element_info' style={{ "width": `${elementFieldDetails["sizes"][index]}`}} >
                        <p className='header_info'>{elementFieldName}</p>
                      </div>
                    )
                  })
                }
                <div className='list_element_infos' style={{ "width": '2%' }}></div>
              </div>
              {
                elements.map(element => {
                  return (
                    <div 
                      className="list_element"
                    >
                      {
                        elementFieldDetails["keys"].map(elementKey => {

                          let index = elementFieldDetails["keys"].indexOf(elementKey);

                          if(["createdAt", "updatedAt"].includes(elementKey)){
                            element[elementKey] = element[elementKey].split("T")[0];
                          }

                          return (
                            <div 
                              className='list_element_infos' 
                              style={{ "width": `${elementFieldDetails["sizes"][index]}` }} 
                              onClick={ () => { elementClick(element) } }
                            >   
                              {
                                (() => {
                                  if( elementFieldDetails["tooltip"][index] ){
                                    return (
                                      <Tooltip title={element[elementKey]}>
                                        <p>{element[elementKey]}</p>
                                      </Tooltip>
                                    )
                                  }else{
                                    return ( 
                                      <p>{element[elementKey]}</p> 
                                    )
                                  }
                                })()
                              }
                            </div>
                          )
                        })
                      }
                      
                      <div className='list_element_infos' style={{ "width": '2%' }}>
                        <DeleteIcon
                          onClick={ () => { deleteElement(element) } }
                          sx={{ 
                            borderRadius: "50%",
                            padding: "2px",
                            margin: "0px 0px 0px -5px",
                            color: smokeWhite,
                            "&:hover": {
                              backgroundColor: smokeWhite,
                              color: whiteHover
                            },
                          }} 
                        />
                      </div>
                    </div>
                  )
                  return 
                })
              }
            </div>
            {
              count > 1 &&
              <div className="list_pagination display_flex_center">
                <Stack spacing={2}>
                  <Pagination count={count} onChange={ (event, value) => { reloadElements(value) } }/>
                </Stack>
              </div>
            }
          </div>
        }
      </div>
      
    </SimulationListStyled>
  );
}
