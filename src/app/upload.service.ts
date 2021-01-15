import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { from, Observable } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  constructor(private storage: AngularFireStorage) {}

  public uploadFileAndGetMetadata(
    mediaFolderPath: string,
    fileToUpload: File,
  ): [percent: Observable<string>, link: Observable<string>] {
    const { name } = fileToUpload;
    const filePath = `${mediaFolderPath}/${new Date().getTime()}_${name}`;
    const uploadTask: AngularFireUploadTask = this.storage.upload(filePath, fileToUpload);
    return [
      uploadTask.percentageChanges().pipe(map((value) => value.toString())),
      this.getDownloadUrl$(uploadTask, filePath).pipe(startWith(null)),
    ];
  }

  private getDownloadUrl$(uploadTask: AngularFireUploadTask, path: string): Observable<string> {
    return from(uploadTask).pipe(switchMap((_) => this.storage.ref(path).getDownloadURL()));
  }
}
