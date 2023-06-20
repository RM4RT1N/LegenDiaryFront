import React, { Component } from 'react';

class MyComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      filteredResults: []
    };
  }

  similarWord(word) {
    // To be implemented, maybe ;P
    return word;
  }

  handleSearchInputChange = (event) => {
    const query = event.target.value;
    this.setState({ searchQuery: query });

    const filtered = this.props.legends.filter(item => {
      const itemName = item.name.toLowerCase();
      const itemDesc = item.description.toLowerCase();
      const searchTerm = query.toLowerCase();
      return (
        itemName.includes(searchTerm) ||
        itemDesc.includes(searchTerm) ||
        itemName.includes(this.similarWord(searchTerm)) ||
        itemDesc.includes(this.similarWord(searchTerm))
      );
    });

    this.setState({ filteredResults: filtered });
  };

  handleClick(item) {
    this.props.flyToMarker(item);
    console.log(item);
  };

  render() {
    const { searchQuery, filteredResults } = this.state;

    return (
      <div className='searchDiv'>
        <table>
          <thead>
            <tr>
              <th>
                <input
                  className='searchBar'
                  type="search"
                  value={searchQuery}
                  onChange={this.handleSearchInputChange}
                  placeholder="Search in LegenDiary..."
                />
              </th>
              <th>
                {/* <button className='clearSearchBtn' ></button> */}
              </th>
            </tr>
          </thead>
        </table>
        {searchQuery !== '' && (
          <ul className='resultList'>
            {filteredResults.map(item => (
              <li
                className="resultItem"
                id={item.id}
                key={item.id}
                onClick={() => this.handleClick(item)}
              >
                {item.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

export default MyComponent;
