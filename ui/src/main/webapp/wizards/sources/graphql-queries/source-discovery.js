import { gql } from "react-apollo";

const payloadFragments = {
  cswConfigurationPayload: gql`
    fragment cswSourceConfigurationPayload on CswSourceConfigurationPayload {
      cswProfile
      sourceName
      endpointUrl
      cswOutputSchema
      cswSpatialOperator
      pid
      eventServiceAddress
      creds {
        username
        password
      }
    }
  `,
  openSearchConfigurationPayload: gql`
    fragment openSearchConfigurationPayload on OpenSearchConfigurationPayload {
      sourceName
      endpointUrl
      pid
      creds {
        username
        password
      }
    }
  `,
  wfsConfigurationPayload: gql`
    fragment wfsConfigurationPayload on WfsSourceConfigurationPayload {
      wfsVersion
      sourceName
      endpointUrl
      pid
      creds {
        username
        password
      }
    }
  `,
}

const queryFragments = {
  discoverOpenSearch: gql`
    fragment discoverOpenSearch on Query {
      openSearch {
        discoverOpenSearch(
          address : $address,
          creds : $creds
        )
        {
          isAvailable
          sourceConfig {
            ...openSearchConfigurationPayload
          }
        }
      }
    }
  `,
  discoverWfs: gql`
    fragment discoverWfs on Query {
      wfs {
        discoverWfs(
          address : $address,
          creds : $creds
        )
        {
          isAvailable
          sourceConfig {
            ...wfsConfigurationPayload
          }
        }
      }
    }
  `,
  discoverCsw: gql`
    fragment discoverCsw on Query {
      csw {
        discoverCsw(
          address : $address,
          creds : $creds
        )
        {
          isAvailable
          sourceConfig {
            ...cswSourceConfigurationPayload
          }
        }
      }
    }
  `
}

const queries = {
  csw: gql`
    query discovercsw ($address: Address!, $creds: Credentials) {
      ...discoverCsw
    }
    ${payloadFragments.cswConfigurationPayload}
    ${queryFragments.discoverCsw}
  `,
  openSearch: gql`
    query discoverOpenSearch ($address: Address!, $creds: Credentials) {
      ...discoverWfs
    }
    ${payloadFragments.openSearchConfigurationPayload}
    ${queryFragments.discoverOpenSearch}
  `,
  wfs: gql`
    query discoverWfs ($address: Address!, $creds: Credentials) {
      ...discoverWfs
    }
    ${payloadFragments.wfsConfigurationPayload}
    ${queryFragments.discoverWfs}
  `,
  all: gql`
    query discoverAllSources ($address: Address!, $creds: Credentials) {
      ...discoverOpenSearch
      ...discoverWfs
      ...discoverCsw
    }
    ${payloadFragments.openSearchConfigurationPayload}
    ${payloadFragments.wfsConfigurationPayload}
    ${payloadFragments.cswConfigurationPayload}
    ${queryFragments.discoverOpenSearch}
    ${queryFragments.discoverWfs}
    ${queryFragments.discoverCsw}
  `
}

export { queries, queryFragments, payloadFragments}
