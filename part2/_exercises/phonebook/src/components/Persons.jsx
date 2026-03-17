const Persons = ({persons, searchFilter}) =>{
    //console.log("Persons", persons, "Search Filter:", searchFilter)
    return(
    <>
        {persons.filter(person => person.name.toLowerCase().startsWith(searchFilter.toLowerCase()))
        .map(person => <p key={person.name}>{person.name} {person.number}</p>)}
    </>
    )
}

export default Persons