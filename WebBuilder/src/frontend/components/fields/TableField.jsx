import { useState } from "react"

export default function TableField({rows, deleteRow, columns, deleteColumn}) {
    const [target, setTarget] = useState({})

    const onChangeColumnTarget = (e) => {
        console.log("test", columns, rows)
        if (e.target.value != undefined) {
            document.getElementById("targetColumn").disabled = false
        } else {
            document.getElementById("targetColumn").disabled = true
        }
        setTarget({...target, [e.target.name]: e.target.value})
    }
    const onChangeRowTarget = (e) => {
        console.log("test", e.target.value)
        if (e.target.value != undefined) {
            document.getElementById("targetRow").disabled = false
        } else {
            document.getElementById("targetRow").disabled = true
        }
        setTarget({...target, [e.target.name]: e.target.value})
    }
    return (
        <div>
            <div className="toolbar">
                <input type="number" name="column" min={1} max={columns} onChange={onChangeColumnTarget} />
                <button onClick={()=>console.log(target)} className="funcBtn" id="targetColumn" disabled>Delete Column</button>
            </div>
            <div className="toolbar">
                <input type="number" name="row" min={1} max={rows} onChange={onChangeRowTarget} />
                <button onClick={()=>{console.log(target)}} className="funcBtn" id="targetRow" disabled>Delete Row</button>
            </div>
        </div>
    );
}