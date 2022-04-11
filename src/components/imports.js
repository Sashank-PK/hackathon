import Header from "./header";
import NavBar from "./nav";
import {useState,useEffect} from 'react'
import '../App.css';
import {importData} from './data';
import { Chart } from "react-google-charts";
const Imports = () => {
    const [allyears, setAllYears] = useState([])
    const [data,setData] = useState(importData)
    const [year,selectedYear] = useState()
    const [country,selectedCountry] = useState('Egypt')
    const [sankeyData,setSankeyData] = useState([])
    const [pieData,setPieData] = useState([])
    var pie_options = {
        title: 'pieChart',

    };
    const filterData = (value)=>{
         const yearFilteredData = importData.filter(item=>(item[3].toString() === year))
        const countryFilteredData = yearFilteredData.filter(item=>(item[1].toString() === country))
        const foodTypeFilteredData = countryFilteredData.filter(item=>(item[0].toString() === value))
        let filteredDataforSankey = [["From","To","Qty"]]
        for (let i=0;i<foodTypeFilteredData.length;i++){
            let row = []
            row.push(foodTypeFilteredData[i][2])
            row.push(foodTypeFilteredData[i][1])
            row.push(foodTypeFilteredData[i][4])
            filteredDataforSankey.push(row)
        }

        let filteredDataforpie = [["From","Qty"]]
        for (let i=0;i<foodTypeFilteredData.length;i++){
            let row = []
            row.push(foodTypeFilteredData[i][2])
            row.push(foodTypeFilteredData[i][4])
            filteredDataforpie.push(row)
        }

        setData(foodTypeFilteredData)
        console.log(filteredDataforSankey)
        console.log(filteredDataforpie)
        setSankeyData(filteredDataforSankey)
        setPieData(filteredDataforpie)

    }
    const filterCountryData = (value)=>{
        const countryFilteredData = importData.filter(item=>item[1].toString() === value)
        setData(countryFilteredData)
    }
    const getAllyearsfromArray = (arr) => {
        const lastIndex = []
        for (let i = 0; i < arr.length; i++) {
            lastIndex.push(arr[i][arr[i].length - 2])

        }
        const uniqueyrs =  [...new Set(lastIndex)]
        setAllYears(uniqueyrs)
    }
        useEffect(() => {
            getAllyearsfromArray(importData)
        }, [data]) //[] dependency array if we need options on useEffect
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
                                <select onChange={e => selectedCountry(e.target.value)}>
                                    <option value='Egypt'>Egypt</option>
                                    <option value='Saudi Arabia'>Saudi</option>
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4">
                                <select
                                        onChange={e => selectedYear(e.target.value)}>
                                    {allyears&& allyears.map(year=>
                                        <option value = {year} >
                                        {year}
                                        </option>)}

                                </select>
                            </div>
                            <div className="col-md-6">
                                <button value ='Wheat' onClick={(e)=>filterData(e.target.value)}>Wheat</button>
                                <button value ='Rice' onClick={(e)=>filterData(e.target.value)}>Rice</button>
                            </div>

                        </div>
                        <div className="row ">
                            <div className="col-md-12">
                                {sankeyData.length>1&& <Chart
                                    chartType="Sankey"
                                    data={sankeyData}
                                    width="400px"
                                    height = "900px"
                                    legendToggle
                                />
                                }

                            </div>

                        </div>
                        <div className="row">
                            <div className="col-md-5">
                                {pieData.length>1&& <Chart
                                    chartType="PieChart"
                                    data={pieData}
                                    width="400px"
                                    height = "900px"
                                    options ={pie_options}
                                />
                                }

                            </div>
                        </div>
                        {/*

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
                                {data && data.map(item => (
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
                        */}

                    </div>
                </div>
            </div>
        )
}
export default Imports

