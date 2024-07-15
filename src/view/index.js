import React, { useEffect, useState } from 'react'
import Switch from '@mui/material/Switch';
import myData from '../temp.json';

const MyMfCalculator = () => {
    const [data, setData] = useState(myData)
    const [fundsData, setFundsData] = useState([])
    const [selectedOption, setSelectedOption] = useState('');
    const [NavValue, setNavValue] = useState(0);
    const [checked, setChecked] = useState(true);
    const [resultValue, setResultValue] = useState(0);
    const [amount, setAmount] = useState(0);
    const [unit, setUnit] = useState(0);

    useEffect(() => {
        if (data.length > 0) {
            const motilalFundsData = data.filter((item) => {
                return item?.category == "Motilal Oswal Mutual Fund"
            })
            setFundsData(motilalFundsData[0].categorydetails)
        }
    }, [data])

    const handleSelectChange = (e) => {
        let tempArr = fundsData.filter((item) => {
            return item.scheme_name == e.target.value
        })
        setNavValue(+tempArr[0].net_asset_value)
        setSelectedOption(e.target.value);
    };

    const handleChangeAmount = (e) => {
        let num = Number(e.target.value);
        setAmount(e.target.value)
        setResultValue(num / NavValue)
    }
    const handleChangeUnit = (e) => {
        let unit = Number(e.target.value);
        setUnit(e.target.value)
        setResultValue(unit / NavValue)
    }

    const handleChange = (event) => {
        setResultValue(0)
        setAmount(0)
        setAmount(0)
        setChecked(event.target.checked);
    };

    return (
        <>
            <div>My MF Calculator</div>
            <select value={selectedOption} onChange={(e) => {
                handleSelectChange(e)
            }}>
                <option value="" disabled>Select an option</option>
                {fundsData.map((option, index) => (
                    <option key={index} value={option.scheme_name}>
                        {option.scheme_name}
                    </option>
                ))}
            </select>
            <br />
            <br />

            <label>
                Result Formula : ( units = Amount / NAV === {NavValue})
                &nbsp; &nbsp;
                {resultValue}
            </label>

            <br />

            {selectedOption &&
                <>
                    <Switch
                        checked={checked}
                        onChange={handleChange}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                    <br />
                    <div>
                        <label>Enter Amount</label>
                        <input
                            type='text'
                            value={amount}
                            disabled={checked}
                            onChange={(e) => {
                                handleChangeAmount(e)
                            }}
                        />
                    </div>
                    <br />
                    <div>
                        <label>Enter Units</label>
                        <input
                            type='text'
                            disabled={!checked}
                            value={unit}
                            onChange={(e) => {
                                handleChangeUnit(e)
                            }}
                        />
                    </div>
                </>
            }
        </>
    )
}

export default MyMfCalculator;