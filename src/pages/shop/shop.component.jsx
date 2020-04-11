import React from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'

import CollectionOverview from '../../components/collections-overview/collections-overview.component'
import CollectionPage from '../collection/collection.component'

import WithSpinner from '../../components/with-spinner/with-spinner.component'

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.util'

import { updateCollections } from '../../redux/shop/shop.actions'

const CollectionOverviewWithSpinner = WithSpinner(CollectionOverview)
const CollectionPageWithSpinner = WithSpinner(CollectionPage)

class ShopPage extends React.Component {  
  state = {
    loading: true
   }
  
  unSubscribeFromSnapshot = null;

  componentDidMount() {
    const { updateCollections } = this.props
    const collectionRef = firestore.collection('collections')

    // fetch('https://firestore.googleapis.com/v1/projects/crown-db-d7d50/databases/(default)/documents/collections')
    // .then(response => response.json())
    // .then(collections => console.log(collections))

    collectionRef.get().then(snapshot => {
      const collectionMap = convertCollectionsSnapshotToMap(snapshot)
      console.log(collectionMap)
      updateCollections(collectionMap)
      this.setState({ loading: false })
    })
    

    // this.unSubscribeFromSnapshot = collectionRef.onSnapshot(async snapshot =>{
    //   const collectionMap = convertCollectionsSnapshotToMap(snapshot)
    //   console.log(collectionMap)
    //   updateCollections(collectionMap)
    //   this.setState({ loading: false })
    // })
  }

  render () {
    const { match } = this.props
    const { loading } = this.state
    return (
      <div className='show-page'>
        <Route exact path={`${match.path}`} render={(props) => <CollectionOverviewWithSpinner isLoading={loading} {...props} />} />
        <Route
          path={`${match.path}/:collectionId`}
          component={(props) => <CollectionPageWithSpinner isLoading={loading} {...props} />}
        />
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
})

export default connect(null, mapDispatchToProps)(ShopPage)