import { Component, OnInit } from '@angular/core';
import { Location, NgFor, NgIf } from '@angular/common';
import { AppInterface } from '../appinterface';
import { AppserviceService } from '../appservice.service';
import { ActivatedRoute } from '@angular/router';
import { NgbRatingConfig, NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { commentInterface } from '../commentInterface';
import { CommentService } from '../comment.service';

@Component({
  selector: 'app-appdetail',
  standalone: true,
  imports: [NgFor, NgIf, NgbRatingModule, NgbCarouselModule],
  templateUrl: './appdetail.component.html',
  styleUrls: ['./appdetail.component.css'],
})
export class AppdetailComponent implements OnInit {
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  appdetail?: AppInterface;
  commentdetails?: commentInterface[] = [];

  constructor(
    private appService: AppserviceService,
    private commentService: CommentService,
    private route: ActivatedRoute,
    private location: Location,
    config: NgbRatingConfig
  ) {
    config.max = 5;
    config.readonly = true;
  }

  ngOnInit(): void {
    this.getappdetail();
    this.getcommentdetail();
  }

  getappdetail(): void {
    const id1 = this.route.snapshot.paramMap.get('id');
    if (id1 !== null) {
      console.log(id1);
      this.appService.getappdetail(id1).subscribe(
        (app) => (this.appdetail = app),
        (error) => console.error('Failed to fetch application details:', error)
      );
    } else {
      console.error('ID parameter is null');
    }
  }
  getcommentdetail(): void {
    const id1 = this.route.snapshot.paramMap.get('id');
    if (id1 !== null) {
      console.log(id1);
      this.commentService.getCommentsByAppId(id1).subscribe(
        (app) => (this.commentdetails = app),
        (error) => console.error('Failed to fetch comment details:', error)
      );
    } else {
      console.error('ID parameter is null');
    }
  }

  deleteComment(index: number) {
    if (this.commentdetails && this.commentdetails.length > index) {
      const comment = this.commentdetails[index];
      console.log('Comment:', comment); // Log the comment object
      const commentId = comment?._id;
      if (commentId) {
        this.commentService.deleteComment(commentId).subscribe(() => {
          this.commentdetails?.splice(index, 1);
        });
      } else {
        console.error('Comment ID is undefined');
      }
    }
  }

  goback(): void {
    this.location.back();
  }
}
