import React, { useEffect } from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import CollectionOverviewContainer from '../../components/collections-overview/collections-overview.container'
import CollectionPageContainer from '../collection/collection.container'

// import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.util'

import { fetchCollectionStart } from '../../redux/shop/shop.actions'

const ShopPage = ({ fetchCollectionsStart, match }) => {
  // state = {
  //   loading: true
  //  }
  
  // unSubscribeFromSnapshot = null;

  useEffect(() => {
    fetchCollectionsStart()
  }, [fetchCollectionsStart])

    
  // componentDidMount() {
  //   const { updateCollections } = this.props
  //   const collectionRef = firestore.collection('collections')

  //   // fetch('https://firestore.googleapis.com/v1/projects/crown-db-d7d50/databases/(default)/documents/collections')
  //   // .then(response => response.json())
  //   // .then(collections => console.log(collections))

  //   collectionRef.get().then(snapshot => {
  //     const collectionMap = convertCollectionsSnapshotToMap(snapshot)
  //     console.log(collectionMap)
  //     updateCollections(collectionMap)
  //     this.setState({ loading: false })
  //   })
    

    // this.unSubscribeFromSnapshot = collectionRef.onSnapshot(async snapshot =>{
    //   const collectionMap = convertCollectionsSnapshotToMap(snapshot)
    //   console.log(collectionMap)
    //   updateCollections(collectionMap)
    //   this.setState({ loading: false })
    // })
  // }
  
  return (
    <div className='show-page'>
      <Route
        exact
        path={`${match.path}`}
        component={CollectionOverviewContainer}
      />
      <Route
        path={`${match.path}/:collectionId`}
        component={CollectionPageContainer}
      />
    </div>
  )
}

// const mapDispatchToProps = dispatch => ({
//   updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
// })

// const mapStateToProps = createStructuredSelector({
//   isCollectionLoaded: selectIsCollectionsLoaded
// })


const mapDispatchToProps = dispatch => ({
  fetchCollectionsStart: () => dispatch(fetchCollectionStart())
})

export default connect(null, mapDispatchToProps)(ShopPage)