const Persons = ({persons, searchFilter, deletePerson}) =>{
    //console.log("Persons", persons, "Search Filter:", searchFilter)
    

    const handleClickDelete = (person) =>{
        const confirmed = window.confirm(`Delete ${person.name}?`)
        confirmed && deletePerson(person.id)
    }

    return(
    <>
        {persons.filter(person => person.name.toLowerCase().startsWith(searchFilter.toLowerCase()))
        .map(person => 
            <p key={person.id}>
                {person.name} {person.number}
                <button onClick={() => handleClickDelete(person)}>delete</button>
            </p>)}
    </>
    )
}

export default Persons