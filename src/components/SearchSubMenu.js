import React from 'react'
import { connect } from 'react-redux'
import produce from 'immer'
import { fetchResults, setFilter, setLimiter } from '../store/actions'
import Checkbox from './elements/Checkbox'
import { statics } from '../statics'

class SearchSubMenu extends React.Component {
    state = {
        //checkedItems: new Map(),
        texts_selectedCollections: ['SB', 'TG', 'KG'],
        catalogs_selectedCollections: ['mongolia', 'ladakh', 'stpetersburg'],
        catalogs_totalDocs: 0,
        texts_totalDocs: 0,
        limiters: {
            texts: {
                author: false,
                title: false,
            },
            catalogs: {
                author: false,
                title: false,
            },
        },
    }

    handleChange = (type, e) => {
        let selectedCollections = `${type}_selectedCollections`

        if (e.target.checked) {
            this.setState(
                {
                    [selectedCollections]: [
                        ...this.state[selectedCollections],
                        e.target.id,
                    ],
                },
                () => this.updateCollections(type)
            )
        } else {
            this.setState(
                {
                    [selectedCollections]: this.state[
                        selectedCollections
                    ].filter((c) => c !== e.target.id),
                },
                () => this.updateCollections(type)
            )
        }
    }

    handleLimiter = (entityType, limiterType, e) => {
        e.persist()
        this.props.setLimiter(entityType, limiterType, e.target.checked)
        this.setState(
            produce((draft) => {
                draft.limiters[entityType][limiterType] = e.target.checked
            })
        )
    }

    updateCollections(type) {
        let data = this.props.collections[type].data
        let updatedFilterCollection = []

        data.filter(
            (f) =>
                this.state[`${type}_selectedCollections`].indexOf(f.key) > -1 &&
                updatedFilterCollection.push(f.filter)
        )

        this.props.setFilter(type, updatedFilterCollection)
    }

    renderLimiter = (type) => {
        return Object.entries(statics.limiters[type]).map((l) => {
            return (
                <li
                    key={`${type}_${l[1].key}`}
                    style={{
                        display: 'inline',
                        paddingRight: '40px',
                    }}
                >
                    <label htmlFor={l[1].key}>
                        <Checkbox
                            id={l[1].key}
                            checked={this.state.limiters[type][l[1].type]}
                            onChange={(e) =>
                                this.handleLimiter(type, l[1].type, e)
                            }
                        />
                        <span>{l[1].type.toUpperCase()}</span>
                    </label>
                </li>
            )
        })
    }

    renderCollections = (type) => {
        let selectedCollections = `${type}_selectedCollections`

        let data = this.props.collections[type].data

        let coll
        if (data) {
            coll = data.map((item) => {
                return (
                    <li
                        key={item.key}
                        style={{ display: 'inline', paddingRight: '40px' }}
                    >
                        <label htmlFor={item.key}>
                            <Checkbox
                                id={item.key}
                                checked={this.state[
                                    selectedCollections
                                ].includes(item.key)}
                                onChange={(e) => this.handleChange(type, e)}
                            />
                            <span>
                                {item.name} ({item.doc_count})
                            </span>
                        </label>
                    </li>
                )
            })
        }
        return coll
    }

    render() {
        const { menuItem } = this.props
        let coll =
            this.props.collections.length <= 0 || menuItem === 'FullText'
                ? null
                : this.renderCollections(menuItem)
        let limiter =
            menuItem === 'FullText' ? null : this.renderLimiter(menuItem)

        return (
            <div id={menuItem} className="categories-container col">
                {menuItem !== 'FullText' ? (
                    <React.Fragment>
                        <ul className="categories">{coll}</ul>
                        {/* <ul className="categories">
                            <li
                                style={{
                                    listStyle: 'none',
                                    display: 'inline',
                                    paddingRight: '20px',
                                }}
                            >
                                <span style={{ opacity: 0.5 }}>
                                    LIMIT SEARCH TO:
                                </span>
                            </li>
                            {limiter}
                        </ul> */}
                    </React.Fragment>
                ) : null}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    collections: state.collections.isFetching ? [] : state.collections,
    filters: state.collections.isFetching ? [] : state.collections.filters,
    offset: state.offsets.texts,
    def: state.searchDefinition,
})

export default connect(mapStateToProps, {
    fetchResults,
    setFilter,
    setLimiter,
})(SearchSubMenu)
