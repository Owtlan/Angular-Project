<!--  1: go to cd my-gaming-app-16 -->

<!-- 2: npm i -->

<!-- 3: ng serve -->

<!-- and if you have the problem read the error down -->









<!-- if you have error like -->

<!-- 
Error: node_modules/rxfire/firestore/lite/interfaces.d.ts:8:29 - error TS2314: Generic type 'AggregateQuerySnapshot<T>' requires 1 type argument(s).

 8 export type CountSnapshot = lite.AggregateQuerySnapshot<{
                               ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 9     count: lite.AggregateField<number>;
   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
10 }, any, DocumentData>;
   ~~~~~~~~~~~~~~~~~~~~~
 -->



<!-- CLICK CNTR and click to node_modules/rxfire/firestore/lite/interfaces.d.ts:8:29 in terminal-->

<!-- NEXT -->
<!-- change  -->


<!-- 
export type CountSnapshot = lite.AggregateQuerySnapshot<{
    count: lite.AggregateField<number>;
}, any, DocumentData>;

to
export type CountSnapshot = lite.AggregateQuerySnapshot<{
    count: lite.AggregateField<number>;
}>
 -->

