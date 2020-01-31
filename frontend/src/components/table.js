import React from 'react';
class Table extends React.Component{
     render(){
         return (
         <div>
             <table>
                 <tr>
                    <td>
                        {this.props.id}
                    </td>
                     <td>
                         {this.props.id}
                     </td>
                 </tr>
             </table>
         </div>
         );
    }
}
export default Table;