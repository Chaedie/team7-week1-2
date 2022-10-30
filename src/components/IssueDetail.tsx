// @flow
import * as React from 'react';
import { useNavigate, useParams } from 'react-router';
import { IssueItem } from './IssueItem';
import ReactMarkDown from 'react-markdown';
import styled from 'styled-components';
import { useEffect } from 'react';
import { useIssuesValue } from '../hooks/useIssues';

export function IssueDetail() {
  const issues = useIssuesValue();
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (issues.length === 0) {
      navigate('/error');
    }
  }, [issues.length, navigate]);

  const [issue] = issues.filter(issue => issue.id === Number(params?.id));

  if (issues.length === 0) return null;
  return (
    <section>
      <S.IssueDetailHeader>
        <img src={issue.user.profile_url} alt={issue.user.name} />
        <IssueItem issue={issue} />
      </S.IssueDetailHeader>
      <ReactMarkDown>{issue.body}</ReactMarkDown>
    </section>
  );
}

const S = {
  IssueDetailHeader: styled.div`
    & {
      display: flex;
      gap: 0.5rem;
      width: 100%;
    }

    & > img {
      width: 3rem;
      height: 3rem;
    }
  `,
};
