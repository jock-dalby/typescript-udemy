# typescript-udemy

## Understanding the TS compiler

The Typescript compiler warns you about errors about your code but continues to compile it nonetheless to give you a chance to run your code in case it is not a real error (i.e. your code still works after it is compiled).

 This behaviour can be suppressed via the compiler options in tsconfig.json.

 ```json
 {
     "compilerOptions": {
         "module": "commonjs",
         "target": "es5",
         "noImplicitAny": false,
         "sourceMap": false
     },
     "exclude": [
         "node_modules"
     ]
 }
 ```

 This is a default file is created when we run 'tsc --init' in the command line. The base config is:

 1. "exclude" => Do not compile anything in the node_modules folder.
 2. "module" => We want to resolve our modules to be commonjs format.
 3. "target" => The target version to which we want to compile is ES5. ES5 is default because it runs in pretty much all browsers.
 4. "noImplicitAny" => Allows TS to implicitly define the 'any' type when no type is defined. Setting this to true may alert you to mistakes and help you to write better, more robust code.
 5. "sourceMap" => Do not create .js.map file upon compilation. Setting this to true will add a .ts file, which can be viewed through the source tab in dev tools. This can be helpful for debugging code as it allows you to put breakpoints directly into your TS code.

 To stop TS compiling code if it has errors we need to add "noEmitOnError": true; to the compilerOptions object. If you delete the .js file created from previous compilations, a new one will not be created until we run 'tsc' in the command line and have no errors returned.

 By adding "strictNullChecks": true to compilerOptions, the compiler will throw an error to any variables evaluating to null (not assigned to a value)

 By adding "noUnusedParameters": true to compilerOptions, the compiler will throw an error if any function parameters are defined but not used. Helpful for writing more succinct code.

You can find a detailed documentation on the TypeScript Compiler Config File (tsconfig.json) here: http://www.typescriptlang.org/docs/handbook/tsconfig-json.html

Detailes on the Compiler Options can be found here: http://www.typescriptlang.org/docs/handbook/compiler-options.html
