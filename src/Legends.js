import React, {Component} from 'react'
class Legends extends Component {
constructor() {
    super()
   
    this.state = {
        data : null
    }

}

loadLegends()
{
    fetch('http://localhost:8081/places')
    .then(response => response.json())
    .then(data => this.setState({data : data}))
    
   
}
componentDidMount()
{
    this.loadLegends()
}

render() {
console.log(this.state.data)
    return ( <div>
            
            </div>
    )
}
}

export default Legends




    

