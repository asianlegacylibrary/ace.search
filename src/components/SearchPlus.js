import '../assets/sass/search.scss'
import React from 'react'
import SearchPlusItem from './SearchPlusItem'
import { ID } from '../store/utilities'

class SearchPlus extends React.Component {
    state = {
        items: [],
    }

    componentDidUpdate = prevProps => {
        if (prevProps.refreshDefinition !== prevProps.refreshDefinition) {
            console.log('prev PROPS', prevProps.refreshDefinition)
            this.props.updateSearchDefinition(this.state.items)
        }
        return null
    }

    updateItems = (id, type, itemState) => {
        this.setState(
            prevState => ({
                items: prevState.items.map(item =>
                    item.id === id ? { ...item, [type]: itemState } : item
                ),
            }),
            () => {
                this.props.updateSearchDefinition(this.state.items)
            }
        )
    }

    handleDelete = id => {
        console.log('delete', id)
        this.setState(
            {
                items: this.state.items.filter(item => item.id !== id),
            },
            () => this.props.updateSearchDefinition(this.state.items)
        )
    }

    handleAddSearch = e => {
        e.preventDefault()
        this.setState(prevState => ({
            items: [
                ...prevState.items,
                { id: ID(), term: '', operator: 'AND' },
            ],
        }))
    }

    render() {
        let items = null
        if (this.state.items.length > 0) {
            items = this.state.items.map(item => {
                return (
                    <SearchPlusItem
                        key={item.id}
                        item={item}
                        updateItem={this.updateItems}
                        handleDelete={this.handleDelete}
                        handleNewSearch={e => this.props.handleNewSearch(e)}
                    />
                )
            })
        }

        return (
            <React.Fragment>
                {items}
                <button
                    className="search-plus btn-flat"
                    onClick={e => this.handleAddSearch(e)}
                >
                    <i className="fal fa-plus" />
                </button>
            </React.Fragment>
        )
    }
}

export default SearchPlus
