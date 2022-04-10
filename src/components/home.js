import Header from "./header";
import NavBar from "./nav";
import '../App.css';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDrag } from 'react-dnd';
import { useDrop } from 'react-dnd';
import { useState } from "react";

//const [graphText,displayGraph] = useState()

export default function Home() {
    const drawGraph = ()=>{
    }
    return (
        <div>
            <div className="row">
                <Header/>
            </div>
            <div className='row'>
                <div className='col-md-3'><NavBar/></div>
                <div className="col-md-1 vl"></div>
                <div className='col-md-8 main-container'>
                    <div className="row">
                        <div className="col-md-9">Year Filter</div>
                        <div className="col-md-3">
                            <select>
                                <option>USA</option>
                                <option>CHINA</option>
                                <option>INDIA</option>
                            </select>
                        </div>
                    </div>

                    <div className=" row annotation">
                        annotation
                    </div>

                    <div className=" row drag-drop-area">
                    <DragDropArea/>
                    </div>
                </div>
            </div>
        </div>
        
    )
}


export function DragDropArea({ isDragging, text }) {
    return (
        <DndProvider backend={HTML5Backend}>
          {/* Here, render a component that uses DND inside it */
          }
          <Basket/>
        </DndProvider>
      )
  }

  export const MenuCard = ({ id, name }) => {
    const [{ isDragging }, dragRef] = useDrag({
        type: 'menuItem',
        item: { id, name },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    })
    return (
        <div className='pet-card' ref={dragRef}>
            {name}
            {isDragging && '😱'}
        </div>
    )
}


export const Basket = () => {
    const [basket, setBasket] = useState([])
    const [{ isOver }, dropRef] = useDrop({
        accept: 'menuItem',
        drop: (item) => setBasket((basket) => 
                            !basket.includes(item) ? [...basket, item] : basket),
        collect: (monitor) => ({
            isOver: monitor.isOver()
        })
    })

    return (
        <div>
            <div style={{backgroundColor:"rgb(143, 179, 209)", width:"800px", height:"600px"}} className='basket' ref={dropRef}>
                {basket.map(menuItem => <MenuCard id={menuItem.id} name={menuItem.name} />)}
                {isOver && <div>Drop Here!</div>}
            </div>
        </div>
    )
}