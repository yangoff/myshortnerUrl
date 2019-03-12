import { Component, OnInit, Output, Input } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Link } from '../model/link';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @Output() domain: String;
  @Output() link: Link;
  @Output() shortener: string;

  private linksCollection: AngularFirestoreCollection<Link>;
  links: Observable<Link[]>;

  constructor(db: AngularFirestore, fb: FormBuilder) {
    this.shortener = '';
    this.linksCollection = db.collection<Link>('links');
    this.links = this.linksCollection.valueChanges();
    this.domain = "kodo.tk";
  }



  ngOnInit() {
  }

  linkForm = new FormGroup({
    alias: new FormControl(''),
    link: new FormControl(''),
    shortLink: new FormControl('')
  });

  submitForm() {
    this.link = this.linkForm.value;
    this.saveLink(this.link);

  }

  generateRandomLink() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    this.linkForm.setValue({ alias: this.linkForm.value.alias, link: this.linkForm.value.link, shortLink: text });
  }

  saveLink(link: Link) {
    this.linksCollection.add(link);
    this.linkForm.setValue({ alias: '', link: '', shortLink: '' });
  }
}