import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  Input,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'rb-file-upload',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileUploadComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileUploadComponent implements ControlValueAccessor {
  uploadedFiles: File[] = [];
  private onChange: (value: any) => void = () => {};
  public fileSizeInvalid = signal<boolean>(false);
  public fileFormatInvalid = signal<boolean>(false);
  @Input() hideTitle!: boolean;
  @Input() multiple = false;

  @Input() set fileFormats(value: string[]) {
    this._fileFormats = value;
    this.acceptedFileFormats = value.join(', ');
  }

  private _fileFormats: string[] = [];
  public acceptedFileFormats = '';

  onFileSelected(event: any): void {
    const inputtedFiles: File[] = event.target.files;
    if (inputtedFiles) {
      let files = [...inputtedFiles];

      if (this._fileFormats.length) {
        files = files.filter(file => {
          const fileName = file.name;
          const fileExtension = fileName.split('.').pop();
          return (
            !!fileExtension &&
            this._fileFormats.some(ext => ext.includes(fileExtension))
          );
        });
      }

      const size = files.reduce((result: number, file: File) => {
        return (result += file.size);
      }, 0);
      // this.uploadedFiles = Array.from(files);
      this.fileSizeInvalid.set(this.filesSizeIsInvalid(size));
      this.fileFormatInvalid.set(files.length < inputtedFiles.length);

      if (!this.fileSizeInvalid()) {
        this.uploadedFiles = this.multiple
          ? [...this.uploadedFiles, ...files]
          : [...files];
        if (this.onChange) {
          this.onChange(this.uploadedFiles);
        }
      }

      if (this.fileSizeInvalid() || this.fileFormatInvalid()) {
        setTimeout(() => {
          this.fileSizeInvalid.set(false);
          this.fileFormatInvalid.set(false);
        }, 6000);
      }
    }
    event.target.value = '';
  }

  removeFile(file: File): void {
    const index = this.uploadedFiles.indexOf(file);
    if (index !== -1) {
      this.uploadedFiles.splice(index, 1);
      if (this.onChange) {
        this.onChange(this.uploadedFiles);
      }
    }
  }

  writeValue(value: any): void {
    if (value && Array.isArray(value)) {
      this.uploadedFiles = value;
    }
    if (!value) {
      this.uploadedFiles = [];
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {}

  setDisabledState(isDisabled: boolean): void {}

  filesSizeIsInvalid(size: number): boolean {
    for (const file of this.uploadedFiles) {
      size += file.size;
    }
    const fileSizeInMbs = size / (1024 * 1024); // shouldn't be greater than 5mb
    const allowedFileSize = 2; //mb;
    if (fileSizeInMbs > allowedFileSize) {
      return true;
    }
    return false;
  }
}
