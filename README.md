Just some simple test cases for yup all-or-nothing-validation using noSortEdges.
Relates to https://github.com/jquense/yup/issues/1561

# Getting Started
```bash
npm install
./test_2.js # should give an error, but not a cyclic dependency error. This is expected.
./test_fail.js # should give cyclic dependency error. Not expected.
diff -uwb test_2.js test_fail.js # see what changed to generate error
```
