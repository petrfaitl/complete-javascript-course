'use strict';

// For this exercise you will be strengthening your page-fu mastery. You will complete the PaginationHelper class, which is a utility class helpful for querying paging information related to an array.

// The class is designed to take in an array of values and an integer indicating how many items will be allowed per each page. The types of values contained within the collection/array are not relevant.

// The following are some examples of how this class is used:

// var helper = new PaginationHelper(['a','b','c','d','e','f'], 4);
// helper.pageCount(); //should == 2
// helper.itemCount(); //should == 6
// helper.pageItemCount(0); //should == 4
// helper.pageItemCount(1); // last page - should == 2
// helper.pageItemCount(2); // should == -1 since the page is invalid

// // pageIndex takes an item index and returns the page that it belongs on
// helper.pageIndex(5); //should == 1 (zero based index)
// helper.pageIndex(2); //should == 0
// helper.pageIndex(20); //should == -1
// helper.pageIndex(-10); //should == -1

// TODO: complete this object/class

// The constructor takes in an array of items and a integer indicating how many
// items fit within a single page
function PaginationHelper(collection, itemsPerPage) {
  this.itemsCount = collection.length || 0;
  this.perPage = itemsPerPage;
}
PaginationHelper.prototype.fullPageCount = function () {
  return Math.floor(this.itemsCount / this.perPage);
};

// returns the number of items within the entire collection
PaginationHelper.prototype.itemCount = function () {
  return this.itemsCount;
};

// returns the number of pages
PaginationHelper.prototype.pageCount = function () {
  return Math.ceil(this.itemsCount / this.perPage);
};

// returns the number of items on the current page. page_index is zero based.
// this method should return -1 for pageIndex values that are out of range
PaginationHelper.prototype.pageItemCount = function (pageIndex) {
  console.log(this.itemsCount, pageIndex, this.perPage);
  if (pageIndex > this.pageCount() - 1) {
    return -1;
  } else if (pageIndex <= this.fullPageCount() - 1) {
    return this.perPage;
  } else {
    return this.itemsCount % this.perPage;
  }
};

// determines what page an item is on. Zero based indexes
// this method should return -1 for itemIndex values that are out of range
PaginationHelper.prototype.pageIndex = function (itemIndex) {
  if (itemIndex > this.itemsCount || itemIndex < 0 || this.itemsCount === 0)
    return -1;
  else return Math.floor(itemIndex / this.perPage);
};

// class PaginationHelper {
//   constructor(items, perPage) {
//     this.itemsCount = items.length;
//     this.perPage = perPage;
//   }

//   pageCount() {
//     return Math.ceil(this.itemsCount / this.perPage);
//   }
//   #fullPageCount() {
//     return Math.floor(this.itemsCount / this.perPage);
//   }

//   itemCount() {
//     return this.itemsCount;
//   }

//   pageItemCount(page) {
//     if (page > this.pageCount() - 1) {
//       return -1;
//     } else if (page <= this.#fullPageCount()) {
//       return this.perPage;
//     } else {
//       return this.itemsCount % this.perPage;
//     }
//   }

//   pageIndex(itemIndex) {
//     if (itemIndex > this.itemsCount || itemIndex < 0) return -1;
//     else return Math.floor(itemIndex / this.perPage);
//   }
// }

const helper = new PaginationHelper(
  [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24,
  ],
  10
); //'a', 'b', 'c', 'd', 'e', 'f'
console.log(helper.pageCount()); //should == 2
console.log(helper.itemCount());
console.log('Page item count');
console.log(helper.pageItemCount(0));
console.log(helper.pageItemCount(2));
console.log('Page Index');
console.log(helper.pageIndex(5));
console.log(helper.pageIndex(0)); //should == 0
console.log(helper.pageIndex(20)); //should == -1
console.log(helper.pageIndex(-10)); //should == -1
