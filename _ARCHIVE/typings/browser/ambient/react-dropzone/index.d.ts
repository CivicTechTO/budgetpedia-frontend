// Generated by typings
// Source: https://raw.githubusercontent.com/DefinitelyTyped/DefinitelyTyped/1da639a106527e0c4010b354a1efe52a3059a291/react-dropzone/react-dropzone.d.ts
// Type definitions for react-dropzone
// Project: https://github.com/paramaggarwal/react-dropzone
// Definitions by: Mathieu Larouche Dube <https://github.com/matdube>
// Definitions: https://github.com/Vooban/DefinitelyTyped


declare module "react-dropzone" {

  import * as React from 'react';

  namespace reactDropzone {

    interface DropzoneProps {
      onDrop?: Function;
      onDropAccepted?: Function;
      onDropRejected?: Function;
      onDragEnter?: Function;
      onDragLeave?: Function;
      style?: Object;
      activeStyle?: Object;
      className?: string;
      activeClassName?: string;
      rejectClassName?: string;
      disableClick?: boolean;
      multiple?: boolean;
      accept?: string;
    }

    export class Dropzone extends React.Component<DropzoneProps, {}> {
    }

  }

  export = reactDropzone.Dropzone;
}