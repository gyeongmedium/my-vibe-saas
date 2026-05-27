## ADDED Requirements

### Requirement: 시험 범위를 날짜별 공부량으로 배분
시스템은 시험 범위(scope), 단위(unit), 마감일(dueDate)을 받아 오늘부터 마감일까지의 `DailyStudyPlan[]`을 반환하는 `distributeScope` 함수를 SHALL 제공한다. 하루 분량은 `Math.floor(scope / days)`, 나머지(remainder)는 첫날에 추가한다.

#### Scenario: 정상 배분 (8챕터, 8일)
- **WHEN** scope=8, dueDate=오늘+7일로 distributeScope 호출
- **THEN** 8개의 DailyStudyPlan이 반환되고 각 amount는 1이며 합계는 8

#### Scenario: 나머지 첫날 추가 (10챕터, 3일)
- **WHEN** scope=10, dueDate=오늘+2일로 distributeScope 호출
- **THEN** 3개의 DailyStudyPlan이 반환되고, 첫날 amount=4, 나머지 이틀 amount=3

#### Scenario: 당일 마감 (남은 일수 0 이하)
- **WHEN** scope=5, dueDate=오늘 이전 날짜로 distributeScope 호출
- **THEN** 1개의 DailyStudyPlan이 반환되고 amount=scope 전체, date=dueDate

### Requirement: 시험 항목 생성 시 자동 배분 적용
ItemForm에서 시험(exam) 유형 항목을 제출하면 시스템은 SHALL distributeScope를 호출하여 생성된 dailyPlan을 ExamItem에 포함시켜야 한다.

#### Scenario: 시험 항목 추가 후 오늘 목표 표시
- **WHEN** 사용자가 scope=6챕터, dueDate=오늘+5일로 시험 항목을 추가
- **THEN** ItemCard의 ExamDailyPlan이 "오늘 목표: 1챕터"를 표시

#### Scenario: 과제/강의 항목에는 배분 미적용
- **WHEN** 사용자가 과제 또는 강의 유형 항목을 추가
- **THEN** distributeScope가 호출되지 않고 dailyPlan 필드 없음
