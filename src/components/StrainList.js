import React from 'react'
import StrainRow from './StrainRow'
import Alert from 'react-bootstrap/Alert'

/**
 * List results of a strain search.
 * @param {Object} props 
 */
export default function StrainList(props) {
  const { strainList, vendorId, vendorStrainsSold, memoGetVendorStrainsSold } = props;

  return (
    <>
      {strainList.length > 0 ?
        (<table className="table table-striped table-dark">
          <thead>
            <tr>
              <td>
                <h4>
                  Strain Name
                </h4>
              </td>
              <td>
                <h4>
                  Race
                </h4>
              </td>
              <td>
                <h4>
                  Likes
            </h4>
              </td>
            </tr>
          </thead>
          <tbody>
            {
              strainList.map(strain =>
                <StrainRow
                  key={strain.strainId}
                  {...{ strain, vendorId, vendorStrainsSold, memoGetVendorStrainsSold }}
                />
              )
            }
          </tbody>
        </table>) :
        (<div>
          <Alert variant="warning">
            Enter a query to view strains.
          </Alert>
        </div>)
      }
    </>
  )
}
