import Header from "./header";
import NavBar from "./nav";

import '../App.css';
import {importData} from './data';
const Imports = () => {
    return (
        <div>
             <div className="row">
                <Header/>
            </div>
            <div className='row'>
                <div className='col-md-3'><NavBar/></div>
                <div className="col-md-1 vl"></div>
                
                <div className='col-md-8 main-container'>
                    <div className="row ">
                        <div className="col-md-9"></div>
                            <div className="col-md-3">
                                <select >
                                    <option>Egypt</option>
                                    <option>Saudi</option>
                                </select>
                            </div>
                        </div>
                    <div className="row">
                        <div className="col-md-6">
                            <select>

                                <option>2015</option>
                                <option>2016</option>
                            </select>
                        </div>
                        <div className="col-md-6">
                            <button>Wheat</button>
                            <button>Rice</button>
                            <button>Corn</button>
                        </div>
                    </div>
                    <div className="row ">
                        <div className="col-md-7">sankey</div>
                        <div className="col-md-5">pie</div>
                    </div>
                    <div className='row'>
                        <table className='table table-striped'>
                            <thead>
                                <td>Importing item</td>
                                <td>importing country</td>
                                <td>Imported from</td>
                                <td>import year</td>
                                <td>import volume</td>
                            </thead>
                            <tbody>
                            {importData && importData.map(item=>(
                                <tr>
                                    <td>{item[0]}</td>
                                    <td>{item[1]}</td>
                                    <td>{item[2]}</td>
                                    <td>{item[3]}</td>
                                    <td>{item[4]}</td>
                                </tr>
                            ))}

                            </tbody>


                        </table>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Imports;

