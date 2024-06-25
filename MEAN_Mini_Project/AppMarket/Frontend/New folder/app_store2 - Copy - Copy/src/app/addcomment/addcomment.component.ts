import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentService } from '../comment.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-comment',
  standalone: true,
  imports: [ReactiveFormsModule],
  providers: [CommentService],
  templateUrl: './addcomment.component.html',
  styleUrls: ['./addcomment.component.css'],
})
export class AddcommentComponent implements OnInit {
  commentForm!: FormGroup;
  appId!: string;

  constructor(
    private fb: FormBuilder,
    private commentService: CommentService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.appId = this.route.snapshot.paramMap.get('id')!;
    this.commentForm = this.fb.group({
      statement: ['', Validators.required],
      rating: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.commentForm?.valid) {
      const commentData = {
        statement: this.commentForm.value.statement,
        rating: this.commentForm.value.rating,
        appId: this.appId!,
      };
      console.log('Submitting comment:', commentData);
      this.commentService.addComment(commentData).subscribe(
        (response) => {
          console.log('Comment added successfully');
          this.router.navigate(['/allapps']);
        },
        (error) => {
          console.error('Error adding comment', error);
        }
      );
    }
  }
}
