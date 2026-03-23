const PersonForm = ({newName, onNewNameInputChange,
    newNumber, onNewNumberInputChange, 
    onSubmit}) =>{
    return(
    <>
        <form onSubmit={onSubmit}>
            <div>
            name: <input value={newName} onChange={onNewNameInputChange}/>
            </div>
            <div>
            number: <input value={newNumber} onChange={onNewNumberInputChange}/>
            </div>
            <div>
            <button type="submit">add</button>
            </div>
        </form>
    </>
    )
}

export default PersonForm