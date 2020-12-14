import firebase from 'firebase';
import WhereFilterOp = firebase.firestore.WhereFilterOp;

export interface Query {
  queryField: string;
  queryCondition: WhereFilterOp;
  queryTitle: string;
}
