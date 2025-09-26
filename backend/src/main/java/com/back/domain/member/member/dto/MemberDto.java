package com.back.domain.member.member.dto;

import com.back.domain.member.member.entity.Member;
import org.springframework.lang.NonNull;

import java.time.LocalDateTime;

public record MemberDto(
    @NonNull long id,
    @NonNull LocalDateTime createDate,
    @NonNull LocalDateTime modifyDate,
    @NonNull String nickname,
    @NonNull boolean isAdmin
) {
    public MemberDto(Member member) {
        this(
                member.getId(),
                member.getCreateDate(),
                member.getModifyDate(),
                member.getNickname(),
                member.isAdmin()
        );
    }
}
