import '../assets/sass/search.scss'
import React from 'react'
import M from 'materialize-css'
class SearchPlusItem extends React.Component {
    state = {
        operator: 'AND',
        term: '',
    }

    componentDidMount = () => {
        let elems = document.querySelectorAll('select')
        M.FormSelect.init(elems)
    }

    handleSelectChange = (id, e) => {
        this.setState({ operator: e.target.value.toUpperCase() }, () => {
            this.props.updateItem(id, 'operator', this.state.operator)
        })
    }

    handleInputChange = (id, e) => {
        this.setState({ term: e.target.value.toUpperCase() }, () => {
            this.props.updateItem(id, 'term', this.state.term)
        })
    }

    render() {
        const { item, handleDelete, handleNewSearch } = this.props

        if (item.operator === 'OR') {
            return (
                <div key={item.id} className="new-input-row-or">
                    <p className="big-or">{item.operator}</p>
                    <button
                        className="btn-flat"
                        onClick={() => handleDelete(item.id)}
                    >
                        <i className="right fa fa-trash new-input-icon" />
                    </button>
                </div>
            )
        } else {
            return (
                <div key={item.id} className="new-input-row">
                    <p>{item.operator}</p>

                    <input
                        className="new-input"
                        autoFocus
                        type="text"
                        value={this.state.term}
                        onChange={(e) => this.handleInputChange(item.id, e)}
                        onKeyDown={(e) =>
                            e.key === 'Enter' ? handleNewSearch(e) : null
                        }
                    />
                    <button
                        className="btn-flat"
                        onClick={() => handleDelete(item.id)}
                    >
                        <i className="right fa fa-trash new-input-icon" />
                    </button>
                </div>
            )
        }
    }
}
export default SearchPlusItem
